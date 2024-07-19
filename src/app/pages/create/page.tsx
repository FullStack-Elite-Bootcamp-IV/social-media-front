'use client'

import AuthGuard from "@/app/components/Guards/AuthGuard";

const Create = () => {
    return (
        <AuthGuard>
        <main className="bg-white">
            <h1>Create Post</h1>
            <p>Roboto</p>
        </main>
        </AuthGuard>
    );
}

export default Create;
