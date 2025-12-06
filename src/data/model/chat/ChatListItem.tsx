export interface ChatListItem {
  id: string;          // conversation id
  partnerId: string;   // karşıdaki kişinin userId'si
  name: string;        // karşıdaki kişinin username'i
  avatar: string; 
  msg: string;
  time: string;
  unread: number;
}
