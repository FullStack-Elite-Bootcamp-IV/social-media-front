'use client'

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import AuthGuard from "@/app/components/Guards/AuthGuard";

const Settings = () => {
    return (
        <AuthGuard>
        <main className="bg-white">
            <h1>Settings</h1>
            <p>Roboto</p>
        </main>
        </AuthGuard>
    );
}

export default Settings;
