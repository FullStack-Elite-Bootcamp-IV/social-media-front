'use client'

import { useContext, useState, ReactNode, FC } from "react"
import { createContext } from "react"
import Cookies from "js-cookie"

interface AuthContextProps {
    loginToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [loginToken, setloginToken] = useState<any>("Hola")
    const login = async (email: string, password: string) => {
        const data = {
            email: email,
            password: password
        }
        try {
            Cookies.set('token', JSON.stringify(data))
        }
        catch (err) {
            console.error(err)
        }
    }

    const register = async (email: string, password: string) => {
        try {
            console.log("hola")
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <AuthContext.Provider value={{ loginToken, login, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Error")
    }
    return context;
}
