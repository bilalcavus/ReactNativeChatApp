export type Chat = {
  id: string;
  name: string;
  msg: string;
  avatar: string;
  time: string;
  unread: number;
};

export type Login = {
  email: string;
  password: string;
}

export type RootStackParamList = {
  LoginScreen: undefined;
  MainTabs: undefined;
  ChatList: undefined;
  ChatScreen: { chat: Chat };
};

export type MainTabParamList = {
  Chat: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type LoginStackParamList = {
  LoginScreen: undefined;
  MainTabs: undefined;
}
