import { create } from "zustand";
import { ConversationViewModelState } from "./ConversationState";
import { ChatListItem } from "../../../data/model/chat/ChatListItem";
import { Conversation, Message } from "../../../data/model/chat/Conversation";
import { mapConversationToChatItem } from "../../../data/model/chat/ConversationMapper";
import { SendMessageReq } from "../../../data/model/chat/SendMessageReq";
import { fetchConversations, fetchMessages, fetchUnreadCount, markSeen as markSeenApi, sendMessage} from "../../../data/service/ChatService";
import { emitSeen, emitSendMessage, subscribeToAllMessages, subscribeToConversationMessages } from "../../../data/service/SocketService";
import { useAuthViewModel } from "../auth/AuthViewModel";


export const useConversationViewModel = create<ConversationViewModelState>((set) => ({
    conversations: [],
    messages : [],
    text: null,
    receiverId: null,
    isLoading: false,
    error: null,
    unreadCountMap: {},
    isMarkSeen: false,

    getConversations: async () => {
        try {
            set({isLoading: true, error: null});

            const response = await fetchConversations();

            const currentUser = useAuthViewModel.getState().user;

            const mapped: ChatListItem[] = response.data.map((c: Conversation) =>
                mapConversationToChatItem(c, currentUser!.id)
            );


            set({
                conversations: mapped,
                isLoading: false,
            });

            return mapped;
        } catch (err: any) {
            console.log("Conversation Error:", err.response?.data || err.message);
            set({
                error: err.response?.data?.message || "Conversation fetch failed",
                isLoading: false,
            });
            return null;
        }
    },

    markSeen: async (conversationId: string) => {
        try {
            const success = await markSeenApi(conversationId);
            if (success) {
                emitSeen(conversationId);
                set((state) => ({
                    isMarkSeen: true,
                    unreadCountMap: { ...state.unreadCountMap, [conversationId]: 0 },
                    conversations: state.conversations.map((c) =>
                        c.id === conversationId ? { ...c, unread: 0 } : c
                    ),
                }));
            }
            return success;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Mark seen failed",
            });
            return null;
        }
    },
    getMessages: async (conversationId: string) => {
        try {
            set({isLoading: true, error: null});
            const response = await fetchMessages(conversationId);
            set({
                messages: response.data,
                isLoading: false,
            });
            return response.data;
        } catch (err: any) {
            console.log("Messages Error:", err.response?.data || err.message);
            set({
                error: err.response?.data?.message || "Messages fetch failed",
                isLoading: false,
            });
            return null;
        }
    },

    sendMessage: async(receiverId, text) => {
        try {   
            set({isLoading: true, error: null});
            const requestBody: SendMessageReq = {
                receiverId,
                text
            };
            emitSendMessage({
                receiverId,
                text,
            });
            const response = await sendMessage(requestBody);
            const newMessage = response.data.message;
            set((state) => ({
                messages: [newMessage, ...state.messages],
            }));
            return newMessage;
        } catch (error) {
            return null;
        }
    },

    getUnreadCount: async(conversationId : string) => {
        try {
            set({isLoading: true, error: null});
            const response = await fetchUnreadCount(conversationId);
            const count = response;
            set((state) => ({
                unreadCountMap: {
                    ...state.unreadCountMap,
                    [conversationId]: count,
                }, 
                conversations: state.conversations.map((c) =>
                  c.id === conversationId ? { ...c, unread: count } : c
                ),
                isLoading: false
            }))
            return count;
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Unread count fetching failed",
                isLoading: false,
            });
            return null;
        }
    },

    subscribeToConversationUpdates: () => {
  const currentUserId = useAuthViewModel.getState().user?.id;

  return subscribeToAllMessages((message: Message) => {
    set((state) => ({
      conversations: applyMessageToConversations(state, message, {
        currentUserId,
        activeConversationId: null,
      }),
    }));
  });
},


    subscribeToMessageStream: (conversationId: string) => {
  const currentUserId = useAuthViewModel.getState().user?.id;

  return subscribeToConversationMessages(conversationId, (message: Message) => {
    set((state) => {
    
    if (message.senderId === currentUserId) {
      return state;
    }
    
      const conversations = applyMessageToConversations(state, message, {
        currentUserId,
        activeConversationId: conversationId,
      });

      if (message.conversationId !== conversationId) {
        return { conversations };
      }

      const exists = state.messages.some((m) => m.id === message.id);
      if (exists) return { conversations };

      return {
        messages: [message, ...state.messages],
        conversations,
      };
    });
  });
},

}));

const applyMessageToConversations = (
    state: ConversationViewModelState,
    message: Message,
    {
        currentUserId,
        activeConversationId,
    }: { currentUserId?: string; activeConversationId: string | null },
) => {
    let updated = false;
    const isActiveConversation = activeConversationId === message.conversationId;
    const shouldIncrementUnread = !isActiveConversation && message.senderId !== currentUserId;

    const conversations = state.conversations.map((item) => {
        if (item.id !== message.conversationId) {
            return item;
        }
        updated = true;
        return {
            ...item,
            msg: message.text,
            time: new Date(message.createdAt).toLocaleTimeString(),
            unread: isActiveConversation ? 0 : shouldIncrementUnread ? item.unread + 1 : item.unread,
        };
    });

    return updated ? conversations : state.conversations;
};
