import { CLIENT_ROUTES, useAppSelector } from "@/shared";
import { useNavigate } from "react-router-dom";

export const MainPage = ({ socket }) => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("joinRoom", {
      user,
      roodId: 1,
    });
    navigate(`${CLIENT_ROUTES.GAME_TEST}/${1}`);
  };

  return (
    <div>
      <button onClick={handleJoin}>В ЛОББИ</button>
    </div>
  );
};
