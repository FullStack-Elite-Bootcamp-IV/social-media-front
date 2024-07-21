'use client'

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/authContext";
import { io } from "socket.io-client";
import { useSearchParams } from "next/navigation";


function Messages ({messages, chatId}) {
    return (
        <ul className="flex flex-col gap-2 py-2">
            {messages.filter((msg) => msg.chatId === chatId).map((msg, index) => (
                <Message key={index} message={msg.message} />
            ))}
        </ul>
    );
}

function Message ({message}) {
    return (
        <li className="py-2 px-6 bg-ligthPurple rounded-xl w-fit text-blancoHueso">{message}</li>
    );
}

const socket = io('https://8c81mq74-5002.use2.devtunnels.ms/chat', {
            auth: {
                token: 234,
            }});

const Chat = () => {
    const chatId = useSearchParams().get('chatId');
    const { loginToken, register } = useAuth();
    const [messages, setMessages ] = useState([]);


    useEffect(() => {
        if (typeof window === undefined) return 

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
        <main className="flex justify-center items-end w-dvw h-dvh bg-purple-50 dark:bg-darkVoid py-4 ">
            <div className="w-full max-w-2xl px-4 md:px-0">
                <Messages messages={messages} chatId={chatId}/>
                <form onSubmit={handleSubmit} className="flex">
                    <input type="text" name="message" className="p-2 rounded-s-xl ring-1 ring-white flex-grow     bg-darkVoid text-blancoHueso placeholder:text-blancoHueso focus:outline-none" />
                    <button className="px-4 bg-liquidLava rounded-e-xl ring-1 ring-white text-blancoHueso">Send</button>
                </form>
            </div>
        </main>
    );
}

export default Chat;