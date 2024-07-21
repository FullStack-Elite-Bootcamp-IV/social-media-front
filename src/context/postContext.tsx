/*'use client'

import { useContext, useState, ReactNode, createContext, FC, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface PostContextProps {
    createPost: (title: string, content: string) => Promise<void>;
    editPost: (id: string, title: string, content: string) => Promise<void>;
    getPosts: () => Promise<any[]>;
    getPostById: (id: string) => Promise<any>;
    getPostByKeyword: (keyword: string) => Promise<any[]>;
    getFollowingPost: () => Promise<any[]>;
    getPostByUserId: (userId: string) => Promise<any[]>;
    editPostVisibility: (id: string, visibility: boolean) => Promise<void>;
    getFavoritePost: () => Promise<any[]>;

    logout: () => Promise<void>;
    darkMode: boolean;
    handleDarkMode: () => void;
}

const PostContext = createContext<PostContextProps | null>(null);

interface PostProviderProps {
    children: ReactNode;
}

export const PostProvider: FC<PostProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const storedMode = window.localStorage.getItem("darkMode");
        return storedMode === 'true' ? true : false;
    });
    const [posts, setPosts] = useState<any[]>([]);
    const router = useRouter();

    const createPost = async (title: string, content: string) => {
        try {
            const newPost = { title, content };
            setPosts(prevPosts => [...prevPosts, newPost]);
        } catch (err) {
            console.error('Create post error:', err);
        }
    };

    const editPost = async (id: string, title: string, content: string) => {
        try {
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === id ? { ...post, title, content } : post
                )
            );
        } catch (err) {
            console.error('Edit post error:', err);
        }
    };

    const getPosts = async (): Promise<any[]> => {
        try {
            return posts;
        } catch (err) {
            console.error('Get posts error:', err);
            return [];
        }
    };

    const getPostById = async (id: string): Promise<any> => {
        try {
            return posts.find(post => post.id === id);
        } catch (err) {
            console.error('Get post by ID error:', err);
            return null;
        }
    };

    const getPostByKeyword = async (keyword: string): Promise<any[]> => {
        try {
            return posts.filter(post => post.title.includes(keyword) || post.content.includes(keyword));
        } catch (err) {
            console.error('Get posts by keyword error:', err);
            return [];
        }
    };

    const getFollowingPost = async (): Promise<any[]> => {
        try {
            return posts.filter(post => true);
        } catch (err) {
            console.error('Get following posts error:', err);
            return [];
        }
    };

    const getPostByUserId = async (userId: string): Promise<any[]> => {
        try {
            return posts.filter(post => post.userId === userId);
        } catch (err) {
            console.error('Get posts by user ID error:', err);
            return [];
        }
    };

    const editPostVisibility = async (id: string, visibility: boolean) => {
        try {
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === id ? { ...post, visibility } : post
                )
            );
        } catch (err) {
            console.error('Edit post visibility error:', err);
        }
    };

    const getFavoritePost = async (): Promise<any[]> => {
        try {
            return posts.filter(post =>  true);
        } catch (err) {
            console.error('Get favorite posts error:', err);
            return [];
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
        router.push("/pages/login");
    };

    return (
        <PostContext.Provider value={{ createPost, editPost, getPosts, getPostById, getPostByKeyword, getFollowingPost, getPostByUserId, editPostVisibility, getFavoritePost, logout, darkMode, handleDarkMode }}>
            {children}
        </PostContext.Provider>
    );
}

export const usePost = (): PostContextProps => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePost must be used within a PostProvider");
    }
    return context;
}
*/