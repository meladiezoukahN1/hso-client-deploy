"use client";

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Notifications from "./Notification";
import { useSession } from "next-auth/react";
import SearchInput from "./search-input";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const date = new Date();

  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 flex items-center h-20 justify-between p-4 bg-gradient-to-l from-[#F5E8C7]/90 to-[#DBB459]/90 backdrop-blur-md border-b border-[#ffffff30] shadow-md z-30">
      <div className="hidden md:flex flex-col mr-72">
        <h1 className="text-lg font-semibold text-gray-800">
          {session?.user.FullName}
        </h1>
        <span className="text-sm text-gray-500">
          {date.getFullYear() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getDate()}
        </span>
      </div>

      {/* حقل البحث المضاف */}
      <div className="flex-1 max-w-2xl mx-7 relative"></div>

      <div className="flex items-center gap-1 md:gap-4 ml-4 md:ml-6">
        {pathname !== "/home" && <SearchInput />}
        <Notifications />
        <div className="flex items-center gap-2 bg-white px-1 md:px-3 py-1 rounded-full shadow-sm text-gray-800 hover:bg-gray-100 transition-colors">
          <FaUserCircle className="w-5 h-5 text-gray-600" />
          <span className="text-xs md:text-base">{session?.user.FullName}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
