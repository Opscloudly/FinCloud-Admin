"use client";
import HOC from "@/components/HOC/HOC";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export default function Index() {
  const { user } = useContext(UserContext);
  return (
    <HOC type="dashboard">
      <section>
        <div>
          <h2 className="text-3xl font-normal text-black">
            Hello, {user.first_name} welcome back
          </h2>
        </div>
      </section>
    </HOC>
  );
}
