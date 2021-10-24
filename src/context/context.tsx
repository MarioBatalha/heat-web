import { createContext, ReactNode } from 'react';

type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

type AuthContextData = {
    user: User | null
}

const AuthContext = createContext(null);

type AuthProvider = {
    children: ReactNode;
}

export const AuthProvider = (props: AuthProvider) => {
    return (
        <AuthContext.Provider value={null}>
            {props.children}
        </AuthContext.Provider>
    )
}