import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  function sameRoute(route: string): boolean {
    return pathname === route;
  }
  return (
    <div className="h-[100%] md:min-w-[200px] hidden md:block bg-white   py-8 px-2 md:sticky top-16">
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
        <li className="sidebar-options">
          <Link href="/projects">Projects</Link>
        </li>
        <li className={`sidebar-options ${sameRoute("/ai") && "current"}`}>
          <Link href="/analytics">Analytics</Link>
        </li>
        <li className={`sidebar-options ${sameRoute("/ai") && "current"}`}>
          <Link href="/analytics">Analytics</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
