import styles from "./ChatMessage.module.scss";
import { useAppSelector } from "@/shared/hooks/useReduxHooks";
import type { IMessage } from "../../../features/Chat/Chat";

interface IMessageBlockProps {
  msg: IMessage;
}

export const ChatMessage = ({ msg }: IMessageBlockProps) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div
      className={`${styles.message} ${
        user?.id === msg.sender?.id ? styles.userMessage : styles.otherMessage
      }`}
    >
      {`${msg.sender.username}:  ${msg.message}`}
    </div>
  );
};
