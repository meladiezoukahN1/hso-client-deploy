"use client";

import { ReactNode, useState } from "react";
import Header from "./Header";
import SideBar from "./Sidebar";
import { Menu } from "lucide-react";

const PageContainer = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen relative">
      {/* زر القائمة للشاشات الصغيرة */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-[18px] right-4 z-50 p-2 rounded-lg bg-none hover:bg-gray-100"
      >
        <Menu size={24} />
      </button>

      <div className="flex">
        {/* القائمة الجانبية */}
        <aside
          className={`
            fixed
            w-64 bg-gray-100 h-screen
            transition-transform duration-300 ease-in-out
            md:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            top-0 right-0
            z-40
          `}
        >
          <SideBar />
        </aside>

        {/* المحتوى الرئيسي */}
        <div className="flex-1 md:mr-64 w-full">
          <Header />
          <section className="p-4 flex-1 w-full overflow-auto mt-20">
            {children}
          </section>
        </div>
      </div>

      {/* الغطاء المعتم عند فتح القائمة */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </main>
  );
};

export default PageContainer;