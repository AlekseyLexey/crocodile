import { useState } from "react";
import { Button } from "@/shared";
import { CreateGameModal } from "@/shared/ui/Modal/CreateGameModal";
import styles from "./LobbyListPage.module.scss";

export const LobbyListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lobbies = [
    { id: 1, name: "Disco" },
    { id: 2, name: "Night" },
    { id: 3, name: "Flash" },
    { id: 4, name: "intro" },
    { id: 5, name: "Fara" }
  ];

  const handleJoinGame = (id: number) => console.log(`Войти в лобби ${id}`);
  const handleCreateGame = (roomName: string) => {
    console.log(`Создана новая игра: ${roomName}`);
   
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Доступные игры</h1>
          
          <div className={styles.lobbiesContainer}>
            {lobbies.map((lobby) => (
              <div key={lobby.id} className={styles.lobbyCard}>
                <span className={styles.lobbyName}>{lobby.name}</span>
                <Button 
                  onClick={() => handleJoinGame(lobby.id)}
                  buttonText="войти"
                  className={styles.joinButton}
                />
              </div>
            ))}
          </div>

          <div className={styles.createButtonWrapper}>
            <Button
              onClick={() => setIsModalOpen(true)}
              buttonText="Создать игру"
              className={styles.createButton}
            />
          </div>
        </div>
      </div>

      <CreateGameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateGame}
      />
    </>
  );
};