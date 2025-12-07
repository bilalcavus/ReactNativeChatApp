import { io, Socket } from "socket.io-client";
import { useAuthViewModel } from "../../feature/auth/AuthViewModel";
import { Message } from "../model/chat/Conversation";

const SOCKET_URL = "http://localhost:4000";

let socket: Socket | null = null;
let cachedToken: string | null = null;

export const connectSocket = (): Socket => {
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

export const disconnectSocket = () => {
  if (!socket) return;
  socket.removeAllListeners();
  socket.disconnect();
  socket = null;
  cachedToken = null;
};

/* ✅ CHAT EKRANI — ODAYA GİREREK */
export const subscribeToConversationMessages = (
  conversationId: string,
  handler: (message: Message) => void
) => {
  const activeSocket = connectSocket();

  activeSocket.emit("join_room", conversationId);
  activeSocket.on("send_message", handler);

  return () => {
    activeSocket.emit("leave_room", conversationId);
    activeSocket.off("send_message", handler);
  };
};

/* ✅ CHAT LİSTESİ — GENEL DİNLEME */
export const subscribeToAllMessages = (
  handler: (message: Message) => void
) => {
  const activeSocket = connectSocket();

  activeSocket.on("send_message", handler);

  return () => {
    activeSocket.off("send_message", handler);
  };
};

/* ✅ MESAJ GÖNDERME */
export const emitSendMessage = (payload: {
  receiverId: string;
  text: string;
}) => {
  const activeSocket = connectSocket();
  activeSocket.emit("send_message", payload);
};
