'use client'

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";

const Settings = () => {
    const { loginToken } = useAuth();
    useEffect(() => {
        console.log(loginToken);
    }, [loginToken]);

    return (
        <div className="bg-black text-white">
            <h1>Settings</h1>
            <p>Roboto</p>
        </div>
    );
}

export default Settings;
