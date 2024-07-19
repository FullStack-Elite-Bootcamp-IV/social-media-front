'use client'

import AuthGuard from "@/app/components/Guards/AuthGuard";

const HomePage = () => {
    return (
        <AuthGuard>
        <main className="bg-white">
            <h1>Homepage</h1>
            <p>Roboto</p>
        </main>
        </AuthGuard>
    );
}

export default HomePage;