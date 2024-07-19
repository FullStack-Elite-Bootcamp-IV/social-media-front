'use client'

import AuthGuard from "@/app/components/Guards/AuthGuard";

const Notification = () => {
    return (
        <AuthGuard>
        <main className="bg-white">
            <h1>Notification</h1>
            <p>Roboto</p>
        </main>
        </AuthGuard>
    );
}

export default Notification;
