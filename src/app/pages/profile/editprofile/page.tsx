'use client'

import { useEffect } from "react";
import { useAuth } from "../../../context/authContext";
import AuthGuard from "@/app/components/Guards/AuthGuard";

const EditProfile = () => {
    return (
        <AuthGuard>
        <main className="bg-white">
            <h1>Edit profile</h1>
            <p>Roboto</p>
        </main>
        </AuthGuard>
    );
}

export default EditProfile;