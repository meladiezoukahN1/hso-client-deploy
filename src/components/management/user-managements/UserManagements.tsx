"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabsConfig } from "@/lib/jsons/mangement/Usermanagementabs";
import BackButton from "../ui/backbutton";
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
    <div className="w-full">
      <div className="w-full py-2">
        <BackButton />
      </div>

      <Tabs defaultValue="add-user" dir="rtl">
        <div className="p-5">
          <TabsList className="grid grid-cols-2 md:flex justify-start mt-20 gap-4 md:gap-2 bg-background">
            {tabsConfig.map((tab, index) => (
              <TabsTrigger
                className="rounded-none text-foreground text-lg transition focus:outline-none hover:bg-secondary/50 data-[state=active]:border-b-2 data-[state=active]:text-secondary"
                key={index}
                value={tab.value}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabsConfig.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {<tab.component />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default UserManagements;
