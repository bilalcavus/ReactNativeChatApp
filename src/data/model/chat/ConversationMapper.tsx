import { ChatListItem } from "./ChatListItem";
import { Conversation } from "./Conversation";

export const mapConversationToChatItem = (
  c: Conversation,
  currentUserId: string,
): ChatListItem => {

  // partner id (undefined ise "" yapıyoruz)
  const partnerId: string =
    c.userIds.find((id: string) => id !== currentUserId) ?? "";

  return {
    id: c.id,
    partnerId,
    name: partnerId, // Şimdilik username yoksa id koyuyoruz
    avatar: `https://i.pravatar.cc/100?u=${partnerId}`,
    msg: c.lastMessage?.text ?? "",
    time: new Date(c.lastMessage?.createdAt).toLocaleTimeString(),
    unread: 0,
  };
};
