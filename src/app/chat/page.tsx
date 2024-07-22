'use client'

import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { redirect, useSearchParams } from "next/navigation";
import { useFollowersMutation } from "@/redux/services/followersApi";
import Messages from "@/components/chat/Messages";

interface Message {
    message: string;
    chatId: string;
    userId: string;
}

let socket: undefined | Socket;

function useChatSocket(chatId: string | null, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) {
    useEffect(() => {
        if (typeof window === 'undefined' || !chatId) return;
        console.log(localStorage.getItem('loginToken'));
        socket = io('https://8c81mq74-5002.use2.devtunnels.ms/chat', {
            auth: { token: localStorage.getItem('loginToken') },
        });

        socket.on('connect', () => console.log('Connected to server'));
        socket.on('receiveMessage', (messageData: Message) => {
            console.log(messageData )
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

function FollowButton({ userId, followId }) {
    const [follow] = useFollowersMutation();
    return (
        <button
            onClick={() => follow({ userId, followId })}
            className="bg-liquidLava text-blancoHueso rounded-xl px-4 py-2"
        >
            Follow
        </button>
    );

}

export default function Chat() {
    const chatId = useSearchParams().get('chatId');
    if (!chatId) return redirect('/homepage');
    const [messages, setMessages] = useState<Message[]>([]);

    useChatSocket(chatId, setMessages);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const messageInput = form.elements.namedItem('message') as HTMLInputElement;
        if (!messageInput || !messageInput.value) return;
        const message = messageInput.value;
        console.log(chatId)
        socket?.emit('message', message, chatId);
        messageInput.value = '';
    }, [chatId, socket]);

    return (
        <main className="flex justify-center items-end w-dvw h-dvh bg-purple-50 dark:bg-darkVoid py-4">
            <div className="w-full max-w-2xl px-4 md:px-0">
                <Messages messages={messages} chatId={chatId}/>
                <form onSubmit={handleSubmit} className="flex">
                    <input type="text" name="message" className="p-2 rounded-s-xl ring-1 ring-white flex-grow     bg-darkVoid text-blancoHueso placeholder:text-blancoHueso focus:outline-none" />
                    <button className="px-4 bg-liquidLava rounded-e-xl ring-1 ring-white text-blancoHueso">Send</button>
                </form>
            </div>
            <FollowButton userId="b8ce0d5f-e9df-4b9a-93fb-5189a27d664e" followId="b8387f27-8aa4-49ad-9562-bcc606612df2" />
        </main>
    );
}
