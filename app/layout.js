"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import UserContextProvider from "@/contexts/UserContext";
import GeneralNotification from "@/components/UI/GeneralNotification";
import UtilityContextProvider from "@/contexts/UtilityContext";
import { Suspense, useEffect } from "react";
import Axios from "@/axios/Axios";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      Axios.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  return (
    <html lang="en">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Dashboard - Ethis Turkey</title>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <UserContextProvider>
            <UtilityContextProvider>
              <>
                <GeneralNotification />
                {children}
              </>
            </UtilityContextProvider>
          </UserContextProvider>
        </Suspense>
      </body>
    </html>
  );
}

const Loading = () => {
  return <div>Loading...</div>;
};
