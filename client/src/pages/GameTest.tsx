import type { IUser } from "@/entities/user";
import { useEffect, useState } from "react";

export const GameTest = ({ socket }) => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("userList", (users: IUser[]) => {
      setUsers(users);
    });
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
};
