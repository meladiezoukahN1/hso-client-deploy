"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabsConfig } from "@/lib/jsons/mangement/BuildingRoomtabs";
import { useAppDispatch } from "@/hooks/redux-toolkit";
import { useEffect } from "react";
import { showBuilding } from "@/lib/fetsures/management/action";

function BuildingRoomManagement() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showBuilding());
  }, [dispatch]);

  return (
    <div className="w-full md:mx-auto">
      <div className="w-full py-[3%] md:px-[37%] text-xl md:text-2xl font-semibold">
        إدارة المباني و الغرف
      </div>
      <Tabs defaultValue="Show-Building" dir="rtl">
        <div className="p-[2%] h-20 md:h-auto">
          <TabsList className="flex flex-row flex-wrap justify-start gap-[1%] bg-background w-full ">
            {tabsConfig.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={tab.value}
                className="min-w-[120px] text-[clamp(14px,1.5vw,20px)] p-[1.5%] md:p-[1%] transition-all   border-b-2 border-transparent data-[state=active]:border-secondary  hover:bg-secondary/20 data-[state=active]:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
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
            className="md:px-[2%] pb-[3%]"
          >
            {<tab.component />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default BuildingRoomManagement;
