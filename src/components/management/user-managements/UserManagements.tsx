"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabsConfig } from "@/lib/jsons/mangement/Usermanagementabs";
import { useAppDispatch } from "@/hooks/redux-toolkit";
import { useEffect } from "react";
import { getUsers, showBuilding } from "@/lib/fetsures/management/action";

function UserManagements() {
  const dispacth = useAppDispatch();

  useEffect(() => {
    dispacth(getUsers());
    dispacth(showBuilding());
  }, [dispacth]);

  return (
    <div className="w-full max- mx-auto">
      <div className="w-full py-[3%] px-[37%] text-3xl font-semibold">
        إدارة المستخدمين
      </div>

      <Tabs defaultValue="add-user" dir="rtl">
        <div className="p-[2%]">
          <TabsList className="flex flex-col md:flex-row justify-start gap-[1%] bg-background w-full">
            {tabsConfig.map((tab, index) => (
              <TabsTrigger
                className="w-full md:w-auto text-[clamp(14px,1.5vw,20px)] p-[1.5%] md:p-[1%] transition-all 
                          border-b-2 border-transparent data-[state=active]:border-secondary 
                          hover:bg-secondary/20 data-[state=active]:bg-transparent
                          focus-visible:ring-0 focus-visible:ring-offset-0"
                key={index}
                value={tab.value}
              >
                <span className="whitespace-nowrap">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabsConfig.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="px-[2%] pb-[3%]"
          >
            {<tab.component />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default UserManagements;
