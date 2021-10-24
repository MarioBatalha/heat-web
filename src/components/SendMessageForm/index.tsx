import { useContext, useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../context/auth';
import { api } from '../../services/api';
import styles from './style.module.scss';

export const SendMessageForm = () => {
    const { user, handleSignOut } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault()
        if(!message.trim()) return;

        await api.post('messages', { message })
        console.log(message)
        setMessage('')
    }  
    return (
        <div className={styles.sendMessageFormWrapper}>
            <button className={styles.signOutButton} onClick={handleSignOut}>
                <VscSignOut size="32" />
            </button>
            
            <header className={styles.userInfo}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size="16" />
                    {user?.login}
                </span>
            </header>

            <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea 
                onChange={e => setMessage(e.target.value)}
                value={message}
                name="message"
                id="message"
                placeholder="Qual é a sua expectativa para o evento"
                />
                <button type="submit">Enviar mensagem</button>
            </form>
        </div>
    )
}