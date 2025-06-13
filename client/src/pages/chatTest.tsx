import { useSocket } from "@/app/store/hooks/useSocket";
import type { IUser } from "@/entities/user";
import { useAppSelector } from "@/shared";
import { useEffect, useState } from "react"



interface IMessage {
	message: string;
	sender: IUser
}

export const ChatTest = ({ roomId }: { roomId: number }) => {

	const [messages, setMessages] = useState<IMessage[]>([]);
	const { socket } = useSocket();
	const { user } = useAppSelector((state) => state.user);
	const [inputMessage, setInputMessage] = useState<string>("");


	useEffect(() => {
		

		socket.on('newMessage', ({ message, sender } : IMessage) => {
			setMessages(prev => [...prev, {message, sender}])
		})


		return () => {
			socket.off('newMessage')
		}


	}, [socket, roomId])

	const onSendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputMessage.trim()) {
			socket.emit('sendMessage', { message: inputMessage.trim(), user, roomId });
			setInputMessage('');
		}
	}

	interface IMessageBlockProps {
			msg: IMessage
		}

	  const MessageBlock = ({ msg } : IMessageBlockProps) =>
    user?.id === msg.sender?.id ? (
				<div style={{ color: 'white' }}>{`${msg.sender.username}:  ${msg.message}`}</div>
    ) : (
      <div style={{ color: 'blue' }}>{`${msg.sender.username}:  ${msg.message}`}</div>
    );

	return (
		<>
			<h3 style={{marginTop:"30px"}}>Тестовый чат</h3>
			<div>
				{messages.map((message, index) => {
					return (
						<MessageBlock msg = {message} key={`${index}_${message.sender.id}`}/>
					)
				})}
			</div>
			<form onSubmit={onSendMessageHandler}>
				<input
					type="text"
					placeholder="Введите сообщение"
					value={inputMessage}
				onChange={(e) => setInputMessage(e.target.value)}/>
				<button type="submit">Отправить</button>
			</form>
		</>
	)
}