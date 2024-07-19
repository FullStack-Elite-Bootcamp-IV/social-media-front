"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import Cookies from "js-cookie";

const Login = () => {
  const { loginToken, register, login, darkMode, handleDarkMode } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodeToken = JSON.parse(token);
    } else {
      console.log("No hay cookie");
    }
  }, [darkMode]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password);
  };

  const handleSetDarkMode = () => {
    handleDarkMode();
  };

  return (
    <main>
      <form id="loginForm" onSubmit={handleLogin}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
      <h1> Login </h1>
      <p> Roboto </p>
      <button onClick={handleSetDarkMode}>modo vista</button>
    </main>
  );
};

export default Login;
