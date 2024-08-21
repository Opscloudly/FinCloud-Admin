"use client";

const { createContext, useState, useEffect } = require("react");

export const UtilityContext = createContext();

export default function UtilityContextProvider({ children }) {
  const [notification, setNotification] = useState({
    status: false,
    msg: null,
    type: null,
  });

  const dispatchNotification = (data) => {
    setNotification(data);
    setTimeout(() => {
      setNotification({
        status: false,
        msg: null,
        type: null,
      });
    }, 3000);
  };

  return (
    <UtilityContext.Provider
      value={{
        notification,
        dispatchNotification,
      }}
    >
      {children}
    </UtilityContext.Provider>
  );
}
