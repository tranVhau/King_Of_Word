import React, { createContext } from "react";

export const SocketContext = createContext();

import { io } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL);

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
