'use client'

import { useContext, useState, ReactNode, createContext, FC } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface UserContextProps {
    createPost: (post: any) => Promise<void>;
    editPost: (postId: string, postData: any) => Promise<void>;
    getPosts: () => Promise<void>;
    getPostById: (postId: string) => Promise<void>;
    getPostByKeyword: (keyword: string) => Promise<void>;
    getFollowingPost: () => Promise<void>;
    getPostByUserId: (userId: string) => Promise<void>;
    editPostVisibility: (postId: string, isVisible: boolean) => Promise<void>;
    getFavoritePost: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const router = useRouter();

    const API_BASE_URL = 'https://social-media-api-1.onrender.com';

    const getAuthHeaders = () => {
        const token = Cookies.get('token');
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    };

    const createPost = async (post: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(post),
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const editPost = async (postId: string, postData: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(postData),
            });
            if (!response.ok) {
                throw new Error('Failed to edit post');
            }
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };

    const getPosts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const posts = await response.json();
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const getPostById = async (postId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            const post = await response.json();
        } catch (error) {
            console.error('Error fetching post by ID:', error);
        }
    };

    const getPostByKeyword = async (keyword: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/search?keyword=${keyword}`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts by keyword');
            }
            const posts = await response.json();
        } catch (error) {
            console.error('Error fetching posts by keyword:', error);
        }
    };

    const getFollowingPost = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/following`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch following posts');
            }
            const posts = await response.json();
        } catch (error) {
            console.error('Error fetching following posts:', error);
        }
    };

    const getPostByUserId = async (userId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/user/${userId}`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts by user ID');
            }
            const posts = await response.json();
        } catch (error) {
            console.error('Error fetching posts by user ID:', error);
        }
    };

    const editPostVisibility = async (postId: string, isVisible: boolean) => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/${postId}/visibility`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ isVisible }),
            });
            if (!response.ok) {
                throw new Error('Failed to edit post visibility');
            }
        } catch (error) {
            console.error('Error editing post visibility:', error);
        }
    };

    const getFavoritePost = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/favorites`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch favorite posts');
            }
            const posts = await response.json();
        } catch (error) {
            console.error('Error fetching favorite posts:', error);
        }
    };

    return (
        <UserContext.Provider value={{ createPost, editPost, getPosts, getPostById, getPostByKeyword, getFollowingPost, getPostByUserId, editPostVisibility, getFavoritePost }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
