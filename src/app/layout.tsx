import type {Metadata} from "next";
import {Roboto_Mono} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {Providers} from "./providers";

const Roboto = Roboto_Mono({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Nexo",
  description: "Social media app",
};

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="es">
    <body className={`${Roboto.className} dark:bg-darkVoid`}>
    <Providers>
      {children}
    </Providers>
    </body>
    </html>
  );
}
