import { useState, useEffect } from "react";
import io from 'socket.io-client';
import styles from "./style.module.scss";
import Logo from "../../assets/logo.svg";

import { api } from "../../services/api";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const messageQueue: Message[] = [];
const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: Message) => {
  messageQueue.push(newMessage);
})

export const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if(messageQueue.length > 0) {
        setMessages(prevState => [
          messageQueue[0],
          prevState[0],
          prevState[1],
        ].filter(Boolean))
        
        messageQueue.shift();
      }
    }, 3000)
  }, []);

  useEffect(() => {
    api.get<Message[]>("messages/last3").then((response) => {
      setMessages(response.data);
    });
  }, []);
  return (
    <div className={styles.messageListWrapper}>
      <img src={Logo} alt="DoWHile 2021" />
      <ul className={styles.messageList}>
        {messages.map(messages => {
          return (
            <li className={styles.message} key={messages.id}>
              <p className={styles.messageContent}>
               {messages.text}
              </p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img
                    src={messages.user.avatar_url}
                    alt={messages.user.name}
                  />
                </div>
                <span>{messages.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
