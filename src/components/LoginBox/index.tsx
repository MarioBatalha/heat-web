import { useEffect } from "react";
import axios from "axios";
import { VscGithubInverted } from "react-icons/vsc";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export const LoginBox = () => {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=102df24cb3b6bae0e8ac`;

  const handleSignIn = async (githubCode: string) => {
    const response = await api.post<AuthResponse>("/authenticate", {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem("@dowhile:token", token);
  };

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);
      handleSignIn(githubCode);
    }
  }, []);
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  );
};
