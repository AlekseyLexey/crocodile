import type React from "react";
import { useState } from "react";
import { io, Socket } from "socket.io-client";
import SocketContext from "./SocketContex";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket>(
    io("ws://crocdraw.ru", {
      transports: ["websocket"],
      path: "/ws",
    })
  );

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
}
