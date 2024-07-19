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
            hola
        </main>
    );
}

export default Create;
