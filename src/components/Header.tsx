"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import useLogin from "@/hooks/useLogin";
import useLogout from "@/hooks/useLogout";
import React, { useState } from "react";
import MenuIcon from "./icons/MenuIcon";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import Close from "./icons/Close";

const Header = () => {
  const { logout } = useLogout();
  const { login } = useLogin();
  const { state } = useAuthContext();
  const { user, authIsReady } = state;
  const [showMenu, setShowMenu] = useState(false);
  const [askPermission, setAskPermission] = useState(
    Notification.permission === "default"
  );

  if (!authIsReady) {
    return <div className="h-16" />;
  }
  return user ? (
    <header className=" fade-in-animation  h-16 md:w-full flex items-center justify-between p-4 sticky top-0 w-[100dvw] z-[99999999]">
      <h1 className="text-xl font-semibold">TrackIt</h1>
      <div className="flex items-center gap-4">
        {askPermission && (
          <button
            onClick={() => {
              if (Notification) {
                Notification.requestPermission().then((perm) => {
                  setAskPermission(perm === "default");
                });
              }
            }}
            className="shadow-sm animate-pulse py-1 px-3 rounded-md bg-blue-400"
          >
            Allow Notifications
          </button>
        )}
        <button
          className="hidden md:block hover:bg-zinc-100 transition-all duration-75 px-2 py-1 rounded-md text-sm"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <button
        className="block md:hidden hover:bg-zinc-100 transition-all duration-75 px-2 py-1 rounded-md text-sm"
        onClick={() => {
          setShowMenu((prev) => !prev);
        }}
      >
        {!showMenu ? <MenuIcon /> : <Close />}
      </button>
      {showMenu && <MobileMenu />}
    </header>
  ) : (
    <header className=" fade-in-animation  h-16 md:w-full flex items-center justify-between p-4 sticky top-0 w-[100dvw]">
      <h1 className="text-xl font-semibold">TrackIt</h1>
      <button
        className="hover:bg-zinc-100 transition-all duration-75 px-4 py-1 rounded-sm bg-zinc-900 shadow-sm text-white"
        onClick={login}
      >
        login
      </button>
    </header>
  );
};

export default Header;
