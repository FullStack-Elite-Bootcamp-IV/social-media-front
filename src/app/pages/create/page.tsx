'use client'

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";

const Create = () => {
    const { loginToken, register } = useAuth();

    useEffect(() => {
        console.log(loginToken);
    }, []);

    return (
        <main className="bg-black">
            <h1>Create Post</h1>
            <p>Roboto</p>
        </main>
    );
}

export default Create;
