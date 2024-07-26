import {createContext, useContext, useEffect, useState, ReactNode, useRef} from 'react';
import { useRouter } from 'next/navigation';
import { useGetCurrentUserQuery, useSetDarkModeMutation } from '@/store/services/authApi';
import { User, UserWithToken } from '@/types/user';
import {toast} from "sonner";

interface UserContextProps {
    user: User | null;
    setUser: (user: User) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserWithToken | null>(null);
    const [loading, setLoading] = useState(true);

    return (
      <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
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
