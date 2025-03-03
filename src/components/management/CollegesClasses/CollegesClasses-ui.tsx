"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabsConfig } from "@/lib/jsons/mangement/CollegesClassesTabs";

function UserManagements() {
  return (
    <div className="pt-8 px-12">
      <h1 className="text-3xl font-bold">الكليات والفصول</h1>
      <Tabs defaultValue="Add-Colleges" dir="rtl">
        <TabsList className="mt-10 bg-background">
          {tabsConfig.map((tab, index) => (
            <TabsTrigger
              className="rounded-none text-black text-lg transition focus:outline-none hover:bg-secondary/50 data-[state=active]:border-b-2 data-[state=active]:text-secondary"
              key={index}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsConfig.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default UserManagements;
