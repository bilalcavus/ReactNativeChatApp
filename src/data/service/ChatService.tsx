import axios from "axios";
import { useAuthViewModel } from "../../feature/auth/AuthViewModel";
import { ConversationsResponse, Message } from "../model/chat/Conversation";
import { ConversationHistory } from "../model/chat/ConversationHistory";
import { SendMessageReq } from "../model/chat/SendMessageReq";
import { SendMessageRes } from "../model/chat/SendMessageRes";
export const api = axios.create({
    baseURL: "http://localhost:4000"
});

api.interceptors.request.use(
    (config) => {
        const token = useAuthViewModel.getState().accessToken;
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);
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

