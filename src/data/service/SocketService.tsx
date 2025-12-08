import { io, Socket } from "socket.io-client";
import { useAuthViewModel } from "../../feature/auth/AuthViewModel";
import { Message } from "../model/chat/Conversation";

const SOCKET_URL = "http://localhost:4000";

type MessageSeenEvent = { conversationId: string } & Record<string, unknown>;
type TypingEvent = { conversationId: string; userId: string };
type PresenceEvent = { userId: string };

let socket: Socket | null = null;
let cachedToken: string | null = null;

const getActiveSocket = (): Socket => {
  const token = useAuthViewModel.getState().accessToken;

  if (socket && cachedToken !== token) {
    disconnectSocket();
  }

  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
      auth: token ? { token } : undefined,
    });
    cachedToken = token ?? null;
  }

  if (!socket.connected) socket.connect();

  return socket;
};

export const connectSocket = (): Socket => getActiveSocket();

export const disconnectSocket = () => {
  if (!socket) return;
  socket.removeAllListeners();
  socket.disconnect();
  socket = null;
  cachedToken = null;
};

const joinConversation = (conversationId: string): Socket => {
  const activeSocket = getActiveSocket();
  activeSocket.emit("join_room", conversationId);
  return activeSocket;
};

export const subscribeToConversationMessages = (
  conversationId: string,
  handler: (message: Message) => void
) => {
  const activeSocket = joinConversation(conversationId);

  const messageHandler = (message: Message) => {
    if (message.conversationId !== conversationId) return;
    handler(message);
  };

  activeSocket.on("send_message", messageHandler);

  return () => {
    leaveConversation(conversationId);
    activeSocket.off("send_message", messageHandler);
  };
};

export const subscribeToAllMessages = (
  handler: (message: Message) => void
) => {
  const activeSocket = getActiveSocket();

  activeSocket.on("send_message", handler);

  return () => {
    activeSocket.off("send_message", handler);
  };
};

export const subscribeToDelivered = (handler: (message: Message) => void) => {
  const activeSocket = getActiveSocket();
  activeSocket.on("message_delivered", handler);
  return () => activeSocket.off("message_delivered", handler);
};

export const subscribeToSeen = (handler: (payload: MessageSeenEvent) => void) => {
  const activeSocket = getActiveSocket();
  activeSocket.on("message_seen", handler);
  return () => activeSocket.off("message_seen", handler);
};

export const subscribeToTyping = (
  conversationId: string,
  handler: (payload: TypingEvent) => void
) => {
  const activeSocket = joinConversation(conversationId);
  const typingHandler = (payload: TypingEvent) => {
    if (payload.conversationId !== conversationId) return;
    handler(payload);
  };
  activeSocket.on("user_typing", typingHandler);
  return () => activeSocket.off("user_typing", typingHandler);
};

export const subscribeToPresence = (
  handler: (payload: PresenceEvent & { status: "online" | "offline" }) => void
) => {
  const activeSocket = getActiveSocket();

  const onlineHandler = (payload: PresenceEvent) =>
    handler({ ...payload, status: "online" });
  const offlineHandler = (payload: PresenceEvent) =>
    handler({ ...payload, status: "offline" });

  activeSocket.on("user_online", onlineHandler);
  activeSocket.on("user_offline", offlineHandler);

  return () => {
    activeSocket.off("user_online", onlineHandler);
    activeSocket.off("user_offline", offlineHandler);
  };
};

export const emitSendMessage = (payload: {
  receiverId: string;
  text: string;
}) => {
  const activeSocket = getActiveSocket();
  activeSocket.emit("send_message", payload);
};

export const emitDelivered = (payload: {
  conversationId: string;
  messageId: string;
}) => {
  const activeSocket = getActiveSocket();
  activeSocket.emit("message_delivered", payload);
};

export const emitSeen = (conversationId: string) => {
  const activeSocket = getActiveSocket();
  activeSocket.emit("message_seen", { conversationId });
};

export const emitTyping = (conversationId: string) => {
  const activeSocket = getActiveSocket();
  activeSocket.emit("user_typing", { conversationId });
};

export const fetchHistory = async (params: {
  conversationId: string;
  cursor?: string;
  take?: number;
}) => {
  const activeSocket = joinConversation(params.conversationId);

  return new Promise<Message[]>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      activeSocket.off("messages", handler);
      reject(new Error("History request timed out"));
    }, 8000);

    const handler = (messages: Message[]) => {
      clearTimeout(timeoutId);
      activeSocket.off("messages", handler);
      resolve(messages);
    };

    activeSocket.once("messages", handler);
    activeSocket.emit("fetch_history", params);
  });
};

export const leaveConversation = (conversationId: string) => {
  const activeSocket = getActiveSocket();
  activeSocket.emit("leave_room", conversationId);
};

