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
      <main className="flex bg-darkVoid sm:bg-slateGray w-full min-h-screen">
        <div className="contenedor-login bg-darkVoid w-96 rounded-3xl pt-5 pb-5 pl-5 pr-5 m-auto">
          <h1 className="text-center  text-blancoHueso text-4xl">Nexo</h1>
          <form
            id="loginForm"
            onSubmit={handleLogin}
            className="flex flex-col  mt-4 mx-4"
          >
            <label htmlFor="email" className="text-blancoHueso text-sm  mb-1">
              Email
            </label>
            <input
              className="rounded-md bg-slateGray h-10 text-blancoHueso p-4"
              type="email"
              id="email"
              placeholder=" Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label
              htmlFor="password"
              className="text-blancoHueso  text-sm  mb-1 mt-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder=" Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md bg-slateGray h-10 text-blancoHueso p-4"
            ></input>
            <button
              type="submit"
              className="text-blancoHueso bg-liquidLava rounded-md mt-2 h-10"
            >
              Login
            </button>
          </form>
          <p className=" mt-5 text-center text-xs text-blancoHueso">
            Don’t have an account? <strong>Sign up</strong>
          </p>
        </div>
      </main>
    );
}

export default Login;  