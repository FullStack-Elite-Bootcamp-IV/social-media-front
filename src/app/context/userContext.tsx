'use client'

import { useContext, useState, createContext, ReactNode } from "react";

interface User {
    id: string;
    username: string;
    followers: string[];
    following: string[];
    profile: any;
}

interface UserContextProps {
    getUsers: () => User[];
    getUserById: (id: string) => User | undefined;
    getFollowers: (id: string) => string[];
    getFollowing: (id: string) => string[];
    editProfile: (id: string, data: any) => void;
    getUsersByUsername: (username: string) => User | undefined;
}

const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>(() => {
        const storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : [];
    });

    const updateLocalStorage = (updatedUsers: User[]) => {
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    const getUsers = (): User[] => {
        return users;
    };

    const getUserById = (id: string): User | undefined => {
        return users.find(user => user.id === id);
    };

    const getFollowers = (id: string): string[] => {
        const user = getUserById(id);
        return user ? user.followers : [];
    };

    const getFollowing = (id: string): string[] => {
        const user = getUserById(id);
        return user ? user.following : [];
    };

    const editProfile = (id: string, data: any) => {
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, profile: data } : user
        );
        updateLocalStorage(updatedUsers);
    };

    const getUsersByUsername = (username: string): User | undefined => {
        return users.find(user => user.username === username);
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
