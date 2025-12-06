import { Message } from "./Conversation";

export interface SendMessageRes{
    success: boolean;
    data: {
        conversationId: string,
        message: Message;
    }
}