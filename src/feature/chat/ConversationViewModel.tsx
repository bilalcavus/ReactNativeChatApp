import { create } from "zustand";
import { ConversationViewModelState } from "./ConversationState";
import { fetchConversations, fetchMessages, sendMessage } from "../../data/service/ChatService";
import { useAuthViewModel } from "../auth/AuthViewModel";
import { mapConversationToChatItem } from "../../data/model/chat/ConversationMapper";
import { SendMessageReq } from "../../data/model/chat/SendMessageReq";
import { ChatListItem } from "../../data/model/chat/ChatListItem";
import { Conversation, Message } from "../../data/model/chat/Conversation";
import { subscribeToConversationMessages, subscribeToAllMessages } from "../../data/service/SocketService";

export const useConversationViewModel = create<ConversationViewModelState>((set) => ({
    conversations: [],
    messages : [],
    text: null,
    receiverId: null,
    isLoading: false,
    error: null,

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
