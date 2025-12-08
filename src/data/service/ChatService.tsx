import { ConversationsResponse, Message } from "../model/chat/Conversation";
import { ConversationHistory } from "../model/chat/ConversationHistory";
import { SendMessageReq } from "../model/chat/SendMessageReq";
import { SendMessageRes } from "../model/chat/SendMessageRes";
import { api } from "../network/apiClient";
export const fetchConversations = async (): Promise<ConversationsResponse> => {
    try {
        const response = await api.get<ConversationsResponse>("/messages/conversations")
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchMessages = async (conversationId: string): Promise<ConversationHistory> => {
    try {
        const response = await api.get<ConversationHistory>(`/messages/${conversationId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const sendMessage = async(body: SendMessageReq): Promise<SendMessageRes> => {
    try {
        const response = await api.post<SendMessageRes>("messages/send", body);
        return response.data;
    } catch (error) {
        throw error;
    }
}
