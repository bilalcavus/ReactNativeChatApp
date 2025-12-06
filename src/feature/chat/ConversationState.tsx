import { LoginRequest } from "../../data/model/auth/LoginRequest";
import { LoginData, User } from "../../data/model/auth/LoginResponse";
import { ChatListItem } from "../../data/model/chat/ChatListItem";
import { Conversation, Message } from "../../data/model/chat/Conversation";
import { SendMessageReq } from "../../data/model/chat/SendMessageReq";
import { SendMessageRes } from "../../data/model/chat/SendMessageRes";


export interface ConversationViewModelState {
    conversations: ChatListItem[];
    messages: Message[];
    isLoading: boolean;
    error: string | null;

    getConversations: () => Promise<ChatListItem[] | null>;
    getMessages: (conversationId: string) => Promise<Message[] | null>;

    sendMessage: (receiverId: string, text: string) => Promise<Message | null>;
}
