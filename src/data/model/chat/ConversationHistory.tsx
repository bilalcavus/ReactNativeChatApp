import { Message } from "./Conversation";

export interface ConversationHistory {
    success: boolean;
    data: Message[];
}