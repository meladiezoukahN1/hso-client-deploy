import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabsConfig } from "@/lib/jsons/advertising";

const advertisingTabs = () => {
  return (
    <div className="w-full md:mx-auto">
      <div className="w-full py-[3%] md:px-[37%] text-xl md:text-3xl font-semibold">
        إدارة الاعلانات
      </div>

      <Tabs defaultValue="add-advertising" dir="rtl">
        <div className="px-[2%]">
          <TabsList className="flex flex-row flex-wrap justify-start gap-[1%] bg-background w-full  ">
            {tabsConfig.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={tab.value}
                className="min-w-[120px] text-[clamp(14px,1.5vw,20px)] p-[1.5%] md:p-[1%] transition-all 
                           border-b-2 border-transparent data-[state=active]:border-secondary 
                           hover:bg-secondary/20 data-[state=active]:bg-transparent
                           focus-visible:ring-0 focus-visible:ring-offset-0"
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
};

export default advertisingTabs;
