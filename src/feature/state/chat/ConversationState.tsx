import { ChatListItem } from "../../../data/model/chat/ChatListItem";
import { Message } from "../../../data/model/chat/Conversation";



export interface ConversationViewModelState {
    conversations: ChatListItem[];
    messages: Message[];
    unreadCountMap: Record<string, number>;
    isLoading: boolean;
    error: string | null;
    isMarkSeen?: boolean;
    
    getConversations: () => Promise<ChatListItem[] | null>;
    getMessages: (conversationId: string) => Promise<Message[] | null>;
    getUnreadCount : (conversationId : string) => Promise<number | null>
    markSeen: (conversationId: string) => Promise<boolean | null>;

    sendMessage: (receiverId: string, text: string) => Promise<Message | null>;
    subscribeToConversationUpdates: () => () => void;
    subscribeToMessageStream: (conversationId: string) => () => void;
}
