import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  handleSignOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export const AuthProvider = (props: AuthProvider) => {
  const [user, setUser] = useState<User | null>(null);
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=102df24cb3b6bae0e8ac`;

  const handleSignIn = async (githubCode: string) => {
    const response = await api.post<AuthResponse>("/authenticate", {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem("@dowhile:token", token);
    setUser(user);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('@doWhile:token')
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);
      handleSignIn(githubCode);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('@doWhile:token')

    if(token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then(response => {
      setUser(response.data);  

      })
    }
  }, [])
  return (
    <AuthContext.Provider
      value={{
        signInUrl,
        user,
        handleSignOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
