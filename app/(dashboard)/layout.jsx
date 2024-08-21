"use client";
import Header from "@/components/layouts/Header";
import { ChevronLeftIcon } from "@/components/Icons";
import Sidebar from "@/components/layouts/Sidebar";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function DashboardLayout({ children }) {
  const { isLoggedIn } = useContext(UserContext);
  const [showSidebar, setShowSidebar] = useState(true);
  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>
        <div className="relative">
          <div
            className={`${
              showSidebar ? "translate-x-0" : "-translate-x-[292px]"
            } absolute w-[300px] py-10 px-6 transition-all duration-200 border-r border-Gray-100 bg-white`}
          >
            <Sidebar />
            <button
              onClick={handleToggleSidebar}
              className={`absolute top-[34px] -right-[16px] bg-white text-Gray-800 w-8 h-8 rounded-full border flex items-center justify-center shadow transition-all duration-500 ${
                showSidebar ? "rotate-0" : "rotate-180"
              }`}
            >
              <ChevronLeftIcon />
            </button>
          </div>
          <div
            className={`${
              showSidebar ? "ml-[300px]" : "ml-2"
            } p-10 min-h-screen bg-[#FCFCFC] transition-all duration-250`}
          >
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
