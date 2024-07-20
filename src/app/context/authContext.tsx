'use client'

import { useContext, useState, ReactNode, createContext, FC, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AuthContextProps {
    loginToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    darkMode: boolean;
    handleDarkMode: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const storedMode = window.localStorage.getItem("darkMode");
        return storedMode === 'true' ? true : false;
    });
    const [loginToken, setLoginToken] = useState<string | null>(Cookies.get('token') || null);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        const data = { email, password };
        try {
            Cookies.set('token', JSON.stringify(data));
            setLoginToken(JSON.stringify(data));
            router.push("/pages/profile");
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    const register = async (email: string, password: string) => {
        try {
            console.log("Registering user with email:", email);
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    const handleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        window.localStorage.setItem("darkMode", newDarkMode.toString());
    };

    useLayoutEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const logout = async () => {
        Cookies.remove('token');
        setLoginToken(null);
        router.push("/pages/login");
    };

    return (
        <AuthContext.Provider value={{ loginToken, login, register, darkMode, handleDarkMode, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
