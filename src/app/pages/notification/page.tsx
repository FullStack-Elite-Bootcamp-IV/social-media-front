'use client'

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";

const Notification = () => {
    const { loginToken, register } = useAuth();

    useEffect(() => {
        console.log(loginToken);
    }, []);

    return (
        <main className="bg-black">
            <h1>Notification</h1>
            <p>Roboto</p>
        </main>
    );
}

export default Notification;
