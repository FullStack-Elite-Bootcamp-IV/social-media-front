import {createContext, useContext, useEffect, useState, ReactNode, useRef} from 'react';
import { useRouter } from 'next/navigation';
import { useGetCurrentUserQuery, useSetDarkModeMutation } from '@/store/services/authApi';
import { User } from '@/types/user';
import {toast} from "sonner";

interface UserContextProps {
    user: User | null;
    setUser: (user: User) => void;
    toggleTheme: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [newTheme, setNewTheme] = useState<boolean>(user?.darkMode || false);
    const userRef = useRef({
        isChangingTheme: false,
    });
    const { data, error, isLoading } = useGetCurrentUserQuery();
    const [setDarkMode, { isSuccess, isLoading: isChangingTheme }] = useSetDarkModeMutation();
    const router = useRouter();

    useEffect(() => {
        if (isChangingTheme) {
            toast.loading('Changing theme...');
        }
        if (isSuccess) {
            setUser({ ...user, darkMode: newTheme } as User);
            document.body.classList.remove('light', 'dark');
            document.body.classList.add(!newTheme ? 'dark' : 'light');
        }
        if (data) {
            setUser(data);
            setLoading(false);
        } else if (error) {
            setLoading(false);
        }
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(user?.darkMode ? 'dark' : 'light');
    }, [data, error, router, isLoading, setLoading, setUser, isChangingTheme, user, newTheme, isSuccess]);

    const toggleTheme = () => {
        if (user) {
            setNewTheme(!user.darkMode as boolean);
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
