'use client'

import { Provider } from 'react-redux';
import store from "@/store";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import { UserProvider } from "@/context/UserContext";
import PrivateRoute from "@/components/protect/PrivateRoute";

interface Props {
  children: ReactNode
}

export function Providers({children}: Props) {
  return (
    <Provider store={store}>
      <UserProvider>
        <PrivateRoute>
          <Toaster richColors position="top-right"/>
          {children}
        </PrivateRoute>
      </UserProvider>
    </Provider>
  )
}