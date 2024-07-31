'use client'

import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { redirect, useSearchParams } from "next/navigation";
import Messages from "@/components/chat/Messages";
import { useUser } from "@/context/UserContext";
import Navbar from "@/components/navbar/Navbar";

interface Message {
    message: string;
    chatId: string;
    userId: string;
}

let socket: undefined | Socket;

function useChatSocket(chatId: string | null, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) {
    useEffect(() => {
        if (typeof window === 'undefined' || !chatId) return;
        socket = io('https://dwhj9dsl-5002.use2.devtunnels.ms/chat', {
            auth: { token: localStorage.getItem('loginToken') },
        });

        socket.on('connect', () => console.log('Connected to server'));
        socket.on('receiveMessage', (messageData: Message) => {
            if (messageData.message) {
                setMessages(prevMessages => [...prevMessages, messageData]);
            }
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [chatId, setMessages]);
}


export default function Chat() {
    const chatId = useSearchParams()?.get('chatId');
    if (!chatId) return redirect('/homepage');
    const [messages, setMessages] = useState<Message[]>([]);

    useChatSocket(chatId, setMessages);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const messageInput = form.elements.namedItem('message') as HTMLInputElement;
        if (!messageInput || !messageInput.value) return;
        const message = messageInput.value;
        socket?.emit('message', message, chatId);
        messageInput.value = '';
    }, [chatId, socket]);

    return (
        <>
            <Navbar />
            <main className="flex justify-center items-end h-dvh bg-purple-50 dark:bg-darkVoid py-4 md:ml-64">
                <div className="w-full max-w-2xl px-4 md:px-0">
                    <Messages messages={messages} chatId={chatId}/>
                    <form onSubmit={handleSubmit} className="flex px-4">
                        <input type="text" name="message" className="p-2 rounded-s-xl ring-1 ring-white flex-grow     bg-darkVoid text-blancoHueso placeholder:text-blancoHueso focus:outline-none" />
                        <button className="px-4 bg-liquidLava rounded-e-xl ring-1 ring-white text-blancoHueso">Send</button>
                    </form>
                </div>
            </main>
        </>
    );
}
