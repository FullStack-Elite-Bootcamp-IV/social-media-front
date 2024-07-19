/*'use client'

import { useContext, useState, ReactNode,  useLayoutEffect , FC } from "react"
import { createContext } from "react"
import Cookies from "js-cookie"
import Router from "next/navigation"
import { useRouter } from "next/navigation"

interface AuthContextProps {
    
    createPost: () => Promise<void>;
    editPost: () => Promise<void>;
    getPosts: () => Promise<void>;
    getPostById: () => Promise<void>;
    getPostByKeyword: () => Promise<void>;
    getFollowingPost: () => Promise<void>;
    getPostByUserId: () => Promise<void>;
    editPostVisibility: () => Promise<void>;
    getFavoritePost: () => Promise<void>;
    get: () => Promise<void>;


    logout: () => Promise<void>;
    darkMode: boolean | null;
    handleDarkMode : () => void|null;

}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    return (
        <AuthContext.Provider value={{ loginToken, login, register , darkMode , handleDarkMode, logout }}>
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
