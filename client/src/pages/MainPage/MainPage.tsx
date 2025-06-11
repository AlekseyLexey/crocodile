import { CLIENT_ROUTES } from "@/shared";
import { useNavigate } from "react-router-dom";

// const roomId = new Date().getMilliseconds();
const roomId = 1;

export const MainPage = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate(`${CLIENT_ROUTES.GAME_TEST}/${roomId}`);
  };

  return (
    <div>
      <button onClick={handleJoin}>В ЛОББИ</button>
    </div>
  );
};
