"use client";

import Axios from "@/axios/Axios";

const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  const dispatchLogin = (user, token) => {
    setUser({
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
    });
    setChecked(true);
    setIsLoggedIn(true);
    localStorage.setItem("admin_token", token);
  };

  const dispatchLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_token");
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (token) {
          Axios.defaults.headers.Authorization = `Bearer ${token}`;
          const {
            data: { status, data },
          } = await Axios.get("check");
          if (status) {
            setUser({
              first_name: data?.first_name,
              last_name: data?.last_name,
              email: data?.email,
            });
            setIsLoggedIn(true);
          } else {
            dispatchLogout();
          }
        } else {
          dispatchLogout();
        }
      } catch (e) {
        dispatchLogout();
        console.log(e.message);
      } finally {
        setChecked(true);
      }
    };

    if (!checked) {
      checkLogin();
    }
  }, [checked, isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        user,
        checked,
        isLoggedIn,
        dispatchLogin,
        dispatchLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
