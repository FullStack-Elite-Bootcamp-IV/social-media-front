'use client'

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";

const Register = () => {
    const { loginToken, register } = useAuth();

    useEffect(() => {
        console.log(loginToken);
    }, []);

    return (
        <main className="bg-black">
            <h1>Register</h1>
            <p>Roboto</p>
        </main>
    );
}

export default Register;
