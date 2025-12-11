import { ConversationsResponse, Message } from "../model/chat/Conversation";
import { ConversationHistory } from "../model/chat/ConversationHistory";
import { MarkSeenResponse } from "../model/chat/MarkSeenResponse";
import { SendMessageReq } from "../model/chat/SendMessageReq";
import { SendMessageRes } from "../model/chat/SendMessageRes";
import { UnreadCountResponse } from "../model/chat/UnreadCount";
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
export const fetchUnreadCount = async (conversationId: string): Promise<number> => {
  const response = await api.get<UnreadCountResponse>(`/messages/${conversationId}/unread-count`);
  const count = response.data?.data?.count;

  if (typeof count !== "number") {
    throw new Error("Unread count missing in response");
  }

  return count;
};

export const markSeen = async (conversationId: string): Promise<boolean> => {
  const response = await api.post<MarkSeenResponse>("/messages/mark-seen", {
    conversationId,
  });
  return !!response.data?.success;
};
