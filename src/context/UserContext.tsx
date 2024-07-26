import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCurrentUserQuery, useSetDarkModeMutation } from '@/store/services/authApi';
import { User, UserWithToken } from '@/types/user';
import { toast } from 'sonner';

interface UserContextProps {
    user: User | null;
    setUser: (user: User) => void;
    toggleTheme: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserWithToken | null>(null);
    const [loading, setLoading] = useState(true);
    const [newTheme, setNewTheme] = useState<boolean>(false);
    const { data, error, isLoading } = useGetCurrentUserQuery();
    const [setDarkMode, { isSuccess, isLoading: isChangingTheme }] = useSetDarkModeMutation();
    const router = useRouter();

    useEffect(() => {
        if (isSuccess && user) {
            setUser({ ...user, darkMode: newTheme });
            document.body.classList.remove('light', 'dark');
            document.body.classList.add(newTheme ? 'dark' : 'light');
            toast.dismiss();
            toast.success('Theme changed successfully');
        }
    }, [isSuccess, newTheme, user]);

    useEffect(() => {
        if (data) {
            setUser(data);
            setNewTheme(data.darkMode);
            setLoading(false);
        } else if (error) {
            setLoading(false);
        }
    }, [data, error]);

    useEffect(() => {
        if (user) {
            document.body.classList.remove('light', 'dark');
            document.body.classList.add(user.darkMode ? 'dark' : 'light');
        }
    }, [user]);

    const toggleTheme = () => {
        if (user) {
            setNewTheme(!user.darkMode);
            setDarkMode({ id: user.userId });
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, toggleTheme, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within an UserProvider');
    }
    return context;
};
