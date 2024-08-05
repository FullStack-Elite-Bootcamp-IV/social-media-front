/*'use client'

import { useContext, useState, createContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface FavoriteContextProps {
    addFavorite: (postId: string) => Promise<void>;
    removeFavorite: (postId: string) => Promise<void>;
    getFavourites: () => Promise<any[]>;
    isFavorite: (postId: string) => Promise<boolean>;
}

const FavoriteContext = createContext<FavoriteContextProps | null>(null);

interface FavoriteProviderProps {
    children: ReactNode;
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
    const router = useRouter();

    const addFavorite = async (postId: string) => {
        try {
        } catch (err) {
            console.error('Add favorite error:', err);
        }
    };

    const removeFavorite = async (postId: string) => {
        try {
        } catch (err) {
            console.error('Remove favorite error:', err);
        }
    };

    const getFavourites = async (): Promise<any[]> => {
        try {
            return []; 
        } catch (err) {
            console.error('Get favourites error:', err);
            return [];
        }
    };

    const isFavorite = async (postId: string): Promise<boolean> => {
        try {
            return false; 
        } catch (err) {
            console.error('Is favorite error:', err);
            return false;
        }
    };

    return (
        <FavoriteContext.Provider value={{ addFavorite, removeFavorite, getFavourites, isFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = (): FavoriteContextProps => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error("useFavorite must be used within a FavoriteProvider");
    }
    return context;
};*/
