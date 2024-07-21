'use client'

import AuthGuard from "@/components/Guards/AuthGuard";

const Chat = () => {

    return (
        <AuthGuard>
        <main className="bg-white">
            <h1>Chat</h1>
            <p>Roboto</p>
        </main>
        </AuthGuard>
    );
}

export default Chat;
