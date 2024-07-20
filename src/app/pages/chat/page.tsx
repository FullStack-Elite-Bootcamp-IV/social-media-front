'use client'

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/authContext";
import { io } from "socket.io-client";
import { useSearchParams } from "next/navigation";



const socket = io('https://8c81mq74-5002.use2.devtunnels.ms/chat', {
            auth: {
                token: 234,
            }});
const Chat = () => {
    const chatId = useSearchParams().get('chatId');
    const { loginToken, register } = useAuth();
    const [messages, setMessages ] = useState([]);


    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('receiveMessage', ({message, chatId}) => {
            console.log(message);
            if (message) {
                setMessages(prevMessages => [...prevMessages, {message, chatId}]);
            }
        })
        console.log('chatId', chatId);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = e.target.message.value
        socket.emit('message', message, chatId);
    }
    
    return (
        <main className="w-dvw h-dvh bg-slate-200 ">
            <div>
                <ul>
                    {messages.filter((msg) => msg.chatId === chatId).map((msg, index) => (
                        <li key={index}>{msg.message}</li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="message" />
                    <button>Send</button>
                </form>
            </div>
        </main>
    );
}

export default Chat;