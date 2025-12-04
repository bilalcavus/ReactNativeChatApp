import { LoginRequest } from "../../data/model/auth/LoginRequest";
import { LoginData, User } from "../../data/model/auth/LoginResponse";
import { ChatListItem } from "../../data/model/chat/ChatListItem";
import { Conversation } from "../../data/model/chat/Conversation";


export interface ConversationViewModelState {
    conversations: ChatListItem[];
    isLoading: boolean;
    error: string | null;

    getConversations: () => Promise<ChatListItem[] | null>;
}
