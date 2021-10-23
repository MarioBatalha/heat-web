import { useEffect } from 'react';
import styles from './style.module.scss';
import Logo from '../../assets/logo.svg';

import { api } from '../../services/api';

export const MessageList = () => {

    useEffect(() => {
        api.get('messages/last3').then(response => {
            console.log(response.data);
        })
    }, [])
    return (
        <div className={styles.messageListWrapper}>
            <img src={Logo} alt="DoWHile 2021" />

            <ul className={styles.messageList}>
                <li className={styles.message}>
                    <p className={styles.messageContent}>Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamo que vamo!</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/mariobatalha.png" alt="Mário Batalha" />
                        </div>
                        <span>Mário Batalha</span>
                    </div>
                </li>
                <li className={styles.message}>
                    <p className={styles.messageContent}>Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamo que vamo!</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/mariobatalha.png" alt="Mário Batalha" />
                        </div>
                        <span>Mário Batalha</span>
                    </div>
                </li>
                <li className={styles.message}>
                    <p className={styles.messageContent}>Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamo que vamo!</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/mariobatalha.png" alt="Mário Batalha" />
                        </div>
                        <span>Mário Batalha</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}