import useLogout from "@/hooks/useLogout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileMenu = () => {
  const pathname = usePathname();
  const { logout } = useLogout();

  function sameRoute(route: string): boolean {
    return pathname === route;
  }
  return (
    <div className="h-[100vh] w-full md:min-w-[200px] absolute left-0 md:block z-[99999999999] bg-white py-8 md:sticky top-16">
      <ul className="flex flex-col items-center w-full md:items-start gap-4">
        <li className={`sidebar-options ${sameRoute("/timer") && "current"}`}>
          <Link href="/timer">Timer</Link>
        </li>
        <li
          className={`sidebar-options ${
            sameRoute("/ai") && "current"
          } hover:text-blue-700`}
        >
          <Link href="/ai">Ask TrackAI</Link>
        </li>
        <li className={`sidebar-options ${sameRoute("/projects") && "current"}`}>
          <Link href="/projects">Projects</Link>
        </li>
        <li className={`sidebar-options ${sameRoute("/analytics") && "current"}`}>
          <Link href="/analytics">Analytics</Link>
        </li>

        <li
          className={`sidebar-options md:hidden`}
        >
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
