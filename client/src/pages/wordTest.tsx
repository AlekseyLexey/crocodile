import { useSocket } from '@/app/store/hooks/useSocket';
import type { IUser } from '@/entities/user';
import { useAppSelector } from '@/shared';
import { useEffect, useState } from 'react';

interface IWordTestProps {
  roomId: number;
}

export const WordTest = ({ roomId }: IWordTestProps) => {
  const { socket } = useSocket();
  const { user } = useAppSelector((state) => state.user);

  const [word, setWord] = useState<string>();
  const [isCorrectWord, setIsCorrectWord] = useState<boolean>(false);

  useEffect(() => {
    //тестово пока тема всегда 1, потом это событие по факту лучше в создание румы?

    socket.emit('chooseTheme', { roomId, themeId: 1 });
    socket.emit('getWord', roomId);

    socket.on('newWord', (randomWord) => {
      setWord(randomWord);
      setIsCorrectWord(false);
    });

		return () => {
			socket.off('chooseTheme')
      socket.off('getWord')
      socket.off('newWord');
    };
  }, [socket, roomId]);

  useEffect(() => {
    socket.on('correctWord', ({ user, message }) => {
      setIsCorrectWord(true);
      alert(`${user} угадал ${message}`);
      socket.emit('getWord', roomId);
		});
		
		return () => {
			socket.off('correctWord');
			socket.off('getWord')
		}

    
  }, [socket, roomId, isCorrectWord]);

  const nextWordHandler = (roomId: number) => {
    socket.emit('getWord', { roomId });
  };

  return (
    <>
      <div style={{ marginTop: '30px' }}>Тестовое слово</div>

      <div>{word}</div>
      <button onClick={() => nextWordHandler(roomId)}>Test next word</button>
    </>
  );
};
