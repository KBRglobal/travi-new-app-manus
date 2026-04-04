import { io, Socket } from "socket.io-client";
import { getApiBaseUrl } from "@/constants/oauth";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const baseUrl = getApiBaseUrl();
    socket = io(baseUrl || "http://localhost:3000", {
      transports: ["websocket", "polling"],
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket(userId: number) {
  const s = getSocket();
  if (!s.connected) {
    s.auth = { userId };
    s.connect();
  }
  return s;
}

export function disconnectSocket() {
  if (socket?.connected) {
    socket.disconnect();
  }
}
