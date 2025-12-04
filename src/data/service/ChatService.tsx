import axios from "axios";
import { useAuthViewModel } from "../../feature/auth/AuthViewModel";
import { ConversationsResponse } from "../model/chat/Conversation";
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