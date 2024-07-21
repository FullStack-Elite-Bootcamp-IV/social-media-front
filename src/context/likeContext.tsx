/*'use client'

import { useContext, useState, createContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { error } from "console";

interface LikeContextProps {
    likePost: (postId: string) => Promise<void>;
    unlikePost: (postId: string) => Promise<void>;
    getLikesCount: (postId: string) => Promise<number>;
    hasLikedPost: (postId: string) => Promise<boolean>;
    getUserLikes: () => Promise<string[]>;
}

const LikeContext = createContext<LikeContextProps | null>(null);

interface LikeProviderProps {
    children: ReactNode;
}

export const LikeProvider: React.FC<LikeProviderProps> = ({ children }) => {
    const router = useRouter();

    const likePost = async (postId: string) => {
        try {
        } catch (err) {
            console.error('Like post error:', err);
        }
    };

    const unlikePost = async (postId: string) => {
        try {
        } catch (err) {
            console.error('Unlike post error:', err);
        }
    };

    const getLikesCount = async (postId: string): Promise<number> => {
        try {
            return 0; 
        } catch (err) {
            console.error('Get likes count error:', err);
            return 0;
        }
    };

    const hasLikedPost = async (postId: string): Promise<boolean> => {
        try {
            return false; 
        } catch (err) {
            console.error('Has liked post error:', err);
            return false;
        }
    };

    const getUserLikes = async (): Promise<string[]> => {
        try {
            return []; 
        } catch (err) {
            console.error('Get user likes error:', err);
            return [];
        }
    };

    return (
        <LikeContext.Provider value={{ likePost, unlikePost, getLikesCount, hasLikedPost, getUserLikes }}>
            {children}
        </LikeContext.Provider>
    );
};

export const useLike = (): LikeContextProps => {
    const context = useContext(LikeContext);
    if (!context) {
        throw new Error("useLike must be used within a LikeProvider");
    }
    return context;
};*/
