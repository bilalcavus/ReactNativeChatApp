import { Conversation } from "./Conversation";

export const mapConversationToChatItem = (
  conversation: Conversation,
  currentUserId: string
) => {
  const partnerId = conversation.userIds.find((id) => id !== currentUserId);

  return {
    id: conversation.id,
    name: partnerId ?? "Unknown",
    avatar: "https://i.pravatar.cc/100?u=" + partnerId, // backend avatar yoksa fake
    msg: conversation.lastMessage?.text ?? "",
    time: new Date(conversation.lastMessage.createdAt).toLocaleTimeString(),
    unread: 0,
  };
};
