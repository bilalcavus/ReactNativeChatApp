import { ChatListItem } from "./ChatListItem";
import { Conversation } from "./Conversation";

export const formatWhatsAppTime = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();

  const isToday =
    date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.toDateString() === yesterday.toDateString();

  if (isYesterday) {
    return "Dün";
  }

  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};


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
    name: c.receiverUsername, // Şimdilik username yoksa id koyuyoruz
    avatar: `https://i.pravatar.cc/100?u=${partnerId}`,
    msg: c.lastMessage?.text ?? "",
    time: c.lastMessage?.createdAt ? formatWhatsAppTime(c.lastMessage.createdAt): "",
    unread: 0,
    lastMessageSenderId: c.lastMessage?.senderId,
  };
};
