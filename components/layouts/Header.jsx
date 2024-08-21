"use client";
import Image from "next/image";
import { BellIcon, HomeIcon } from "../Icons";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Select from "../UI/Select";

export default function Header() {
  const { user, dispatchLogout } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = (e) => {
    dispatchLogout();
    router.replace("/auth/login");
  };
  const langOption = [
    { id: "tr", label: "Turkey", value: "tr" },
    { id: "en", label: "English", value: "en" },
  ];
  return (
    <header className="w-full px-10 border border-b border-Gray-100">
      <div className="flex justify-between items-center h-[80px]">
        <div className="flex items-center">
          <Image
            src="/assets/images/default/logo.png"
            width={164}
            height={41}
            alt="Logo"
          />
        </div>
        <div className="flex items-center gap-6">
          <div>
            <Select
              name="lang"
              onChange={() => {}}
              options={langOption}
              selectPointer={false}
            />
          </div>
          <div>
            <Link href="/">
              <HomeIcon />
            </Link>
          </div>
          <div>
            <BellIcon />
          </div>
          <button className="dropdown">
            <div
              type="button"
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <Image
                src="/assets/images/temp/avatar.jpeg"
                width={40}
                height={40}
                alt="avatar"
                className="rounded-full"
              />
              <span className="text-black font-semibold">{`${user?.first_name} ${user?.last_name}`}</span>
            </div>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
              <li>
                <Button
                  label="Logout"
                  onClick={handleLogout}
                  className="flex gap-x-4 pr-4 pl-8 py-2.5 text-red-500 hover:bg-Gray-100 menu-sub-item font-semibold outline-none transition-all duration-150 ease-in-out rounded-lg"
                />
              </li>
            </ul>
          </button>
        </div>
      </div>
    </header>
  );
}
