export type Chat = {
  id: string;
  name: string;
  msg: string;
  avatar: string;
  time: string;
  unread: number;
};

export type RootStackParamList = {
  MainTabs: undefined;
  ChatList: undefined;
  ChatScreen: { chat: Chat };
};

export type MainTabParamList = {
  Chat: undefined;
  Profile: undefined;
  Settings: undefined;
};
