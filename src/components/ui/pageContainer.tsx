import { ReactNode } from "react";
import Header from "./Header";
import SideBar from "./Sidebar";

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen flex">
      <aside className="w-64 bg-gray-100">
        <SideBar />
      </aside>

      <div className="flex flex-col flex-1">
        <Header />
        <section className="p-4 flex-1 w-full overflow-auto mt-20">
          {children}
        </section>
      </div>
    </main>
  );
};

export default PageContainer;
