'use client'

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";

const Chat = () => {
    const { loginToken, register } = useAuth();

    useEffect(() => {
        console.log(loginToken);
    }, []);

    return (
        <div className="bg-black">
            <h1>Chat</h1>
            <p>Roboto</p>
        </div>
    );
}

export default Chat;
