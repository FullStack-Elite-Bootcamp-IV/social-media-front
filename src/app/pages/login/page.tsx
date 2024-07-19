'use client'

import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import Cookies from "js-cookie"

const Login = () => {
    const { loginToken, register, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            const decodeToken = JSON.parse(token);
            console.log(decodeToken);
        }
        else {
            console.log("No hay cookie");
        }

    }, [])

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(email, password);
    }




    return (
        <main className="bg-liquidLava">
            <form id="loginForm" onSubmit={handleLogin}>
                <input className="bg-liquidLava" type="email" id="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" id="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">
                    Login
                </button>
            </form>
            <h1> Login </h1>
            <p> Roboto </p>
        </main>
    )
}

export default Login;  