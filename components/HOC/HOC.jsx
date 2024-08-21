"use client";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect } from "react";
import PageLoader from "../UI/PageLoader";
import { useRouter } from "next/navigation";

export default function HOC({ children, type }) {
  const router = useRouter();
  const { isLoggedIn, checked } = useContext(UserContext);

  useEffect(() => {
    if (checked) {
      console.log("isloggeding", isLoggedIn);
      if (isLoggedIn && type == "login") {
        router.replace("/");
      }
      if (!isLoggedIn && type == "dashboard") {
        router.replace("/auth/login");
      }
    }
  }, [isLoggedIn, checked]);

  if (!checked) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
