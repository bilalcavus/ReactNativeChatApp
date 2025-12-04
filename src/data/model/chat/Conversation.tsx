export interface ConversationsResponse {
  success: boolean;
  data: Conversation[];
}

export interface Conversation {
  id: string;
  userIds: string[];
  lastMessageId: string;
  updatedAt: string;
  createdAt: string;
  lastMessage: Message;
}


export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  text: string;
  status: "SENT" | "DELIVERED" | "READ";
  createdAt: string;
}
