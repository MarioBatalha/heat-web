import { useState, useEffect } from "react";
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

export const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);

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
