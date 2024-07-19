'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Loading from '../loading/Loading';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            setAuthenticated(true);
        } else {
            router.push('/pages/login');
        }

        setLoading(false);
    }, [router]);

    if (loading) {
        return <Loading />;
    }

    if (!authenticated) {
        return null; 
    }

    return <>{children}</>;
};

export default AuthGuard;
