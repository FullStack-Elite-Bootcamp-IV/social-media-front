'use client'

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import AuthGuard from "@/app/components/Guards/AuthGuard";

const Register = () => {
    return (
        <main className="bg-white">
            <h1>Register</h1>
            <p>Roboto</p>
        </main>
    );
}

export default Register;
