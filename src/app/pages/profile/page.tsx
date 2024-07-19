'use client';

import AuthGuard from '@/app/components/Guards/AuthGuard';
import { useAuth } from '@/app/context/authContext';

const Profile: React.FC = () => {
    const {logout} = useAuth()
    const handleLogout = () => {
        logout();
    }
    return (
        <AuthGuard>
            <main className="bg-white">
                <button onClick={handleLogout}>
                    logout
                </button>
                <h1>Profile</h1>
                <p>Roboto</p>
            </main>
        </AuthGuard>
    );
};

export default Profile;
