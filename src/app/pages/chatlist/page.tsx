'use client'

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";

const ChatList = () => {
    const { loginToken } = useAuth();

    useEffect(() => {
        console.log(loginToken);
        
    }, []);

    return (
        <div className="bg-gray-100 p-4">
            <h1 className="text-2xl font-bold">Chat List</h1>
            {}
            <p>Chat list content will go here.</p>
        </div>
    );
}

export default ChatList;
