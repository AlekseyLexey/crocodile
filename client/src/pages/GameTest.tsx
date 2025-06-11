import type { IUser } from "@/entities/user";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/shared";
import { useSocket } from "@/app/store/hooks/useSocket";

// const roomId = new Date().getMilliseconds();
const roomId = 1;

export const GameTest = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { user } = useAppSelector((state) => state.user);
  const { socket } = useSocket();

  useEffect(() => {
    socket.emit("joinRoom", {
      user,
      roomId,
    });
    socket.on("userList", ({ users }) => {
      console.log(users);

      setUsers(users);
    });

    socket.on("message", (message: string) => {
      console.log(message);
    });

    return () => {
      socket.off("userList");
      socket.off("message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {users.map(({ user }) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
};
