"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabsConfig } from "@/lib/jsons/mangement/BuildingRoomtabs";
import BackButton from "../ui/backbutton";

function BuildingRoomManagement() {

  return (
    <div className={`w-full `}>
      <BackButton />

      <Tabs defaultValue="Show-Building" dir="rtl" className="w-full">
        <div className="w-[800px]">
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
            {tab.component ? <tab.component /> : <div>Component Not Found</div>}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default BuildingRoomManagement;
