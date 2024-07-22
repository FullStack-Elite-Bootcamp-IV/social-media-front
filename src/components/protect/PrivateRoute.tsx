import { ReactNode, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Loading from "@/components/loading/Loading";
import { usePathname } from 'next/navigation'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  return children;
};

export default PrivateRoute;
