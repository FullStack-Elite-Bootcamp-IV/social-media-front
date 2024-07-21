/* 'use client'

import { useContext, useState, createContext, ReactNode } from "react";

interface User {
    id: string;
    username: string;
    followers: string[];
    following: string[];
    profile: any;
}

interface UserContextProps {
    getUsers: () => Promise<User[]>;
    getUserById: (id: string) => Promise<User | undefined>;
    getFollowers: (id: string) => Promise<string[]>;
    getFollowing: (id: string) => Promise<string[]>;
    editProfile: (id: string, data: any) => Promise<void>;
    getUsersByUsername: (username: string) => Promise<User | undefined>;
}

const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const apiUrl = "https://social-media-api-1.onrender.com/";

    const fetchFromApi = async (endpoint: string, options?: RequestInit) => {
        const response = await fetch(`${apiUrl}${endpoint}`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    const getUsers = async (): Promise<User[]> => {
        return fetchFromApi('users');
    };

    const getUserById = async (id: string): Promise<User | undefined> => {
        try {
            const users = await getUsers();
            return users.find(user => user.id === id);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    const getFollowers = async (id: string): Promise<string[]> => {
        const user = await getUserById(id);
        return user ? user.followers : [];
    };

    const getFollowing = async (id: string): Promise<string[]> => {
        const user = await getUserById(id);
        return user ? user.following : [];
    };

    const editProfile = async (id: string, data: any) => {
        await fetchFromApi(`users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ profile: data }),
        });
    };

    const getUsersByUsername = async (username: string): Promise<User | undefined> => {
        try {
            const users = await getUsers();
            return users.find(user => user.username === username);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    return (
        <UserContext.Provider value={{ getUsers, getUserById, getFollowers, getFollowing, editProfile, getUsersByUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
 */

