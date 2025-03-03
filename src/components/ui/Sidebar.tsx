"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import Image from "next/image";
import LogoutPage from "../auth/logout";
import { sidebarItems } from "@/lib/jsons/navbar";

export default function SideBar() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (name: string) => {
    setOpenSection((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    for (const item of sidebarItems) {
      if (
        item.children &&
        item.children.some((child) => pathname.startsWith(child.href))
      ) {
        setOpenSection(item.name);
        break;
      }
    }
  }, [pathname]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div className="fixed right-0 top-0 h-screen w-64 bg-gradient-to-b from-[#F5E8C7] to-[#DBB459] shadow-lg overflow-auto">
      <div className="flex items-center justify-center pt-6">
        <Image src="/image.png" width={60} height={60} alt="" />
      </div>

      <nav className="p-4">
        {sidebarItems.map((item) => (
          <div key={item.name} className="mb-2">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleSection(item.name)}
                  className={clsx(
                    "w-full flex items-center justify-between p-3 rounded-lg",
                    "hover:text-white hover:bg-[#F5E8C7] transition-colors",
                    isActive(item.href) && "bg-[#F5E8C7]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-primary-700" />
                    <span className="text-primary-900 text-lg font-semibold">
                      {item.name}
                    </span>
                  </div>
                  {openSection === item.name ? (
                    <HiChevronUp className="w-5 h-5 text-primary-700" />
                  ) : (
                    <HiChevronDown className="w-5 h-5 text-primary-500" />
                  )}
                </button>

                {openSection === item.name && (
                  <div className="ml-8 mt-1 mr-5 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={clsx(
                          "flex items-center gap-3 p-1 rounded-lg",
                          "hover:text-white hover:bg-[#F5E8C7] transition-colors",
                          isActive(child.href) && "bg-[#F5E8C7]"
                        )}
                      >
                        {child.icon ? (
                          <child.icon className="w-4 h-4 text-primary-600" />
                        ) : (
                          <span
                            className={clsx(
                              "w-2 h-2 border border-primary-600 rounded-full",
                              isActive(child.href) && "bg-primary-600"
                            )}
                          ></span>
                        )}
                        <span className="text-base text-primary-800 font-medium">
                          {child.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-lg",
                  "hover:text-white hover:bg-[#F5E8C7] transition-colors",
                  isActive(item.href) && "bg-[#F5E8C7]"
                )}
              >
                <item.icon className="w-5 h-5 text-primary-700" />
                <span className="text-primary-900 text-lg">{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
      <LogoutPage />
    </div>
  );
}
