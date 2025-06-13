import type React from "react";
import { createContext } from "react";
import { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket;
  setSocket: React.Dispatch<React.SetStateAction<Socket>>;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export default SocketContext;
