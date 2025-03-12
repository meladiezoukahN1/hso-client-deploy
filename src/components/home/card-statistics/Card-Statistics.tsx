"use client";
import { useAppSelector } from "@/hooks/redux-toolkit";
import { useEffect, useState } from "react";
import { CardProps } from "home";
import { Spinner } from "@nextui-org/react";
import { RxPerson } from "react-icons/rx";
import { LuBedSingle, LuFolders } from "react-icons/lu";
import ComponentChart from "@/components/ui/RadialChart";

export default function DashboardCards() {
  const [statistics, setStatistics] = useState<CardProps[]>([]);
  const { statistics: statisticsSate } = useAppSelector((state) => state.home);

  useEffect(() => {
    if (statisticsSate) {
      setStatistics([
        {
          title: "العدد الكلي للطلبة",
          count: statisticsSate.total_students,
          max: statisticsSate.total_students,
          color: "#1A3D61",
          icon: RxPerson,
        },
        {
          title: "الغرف المتوفرة",
          count: statisticsSate.available_rooms,
          max: 20,
          color: "#DB0000",
          icon: LuBedSingle,
        },
        {
          title: "الطلبات المعلقة",
          count: statisticsSate.pending_requests,
          max: statisticsSate.pending_requests,
          color: "#1A3D61",
          icon: LuFolders,
        },
      ]);
    }
  }, [statisticsSate]);

  if (!statistics) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-cairo font-bold text-2xl md:text-3xl mb-4 md:mb-6 mr-4 md:mr-10">
        إحصائيات :
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-5 justify-center">
        {statistics.map((card, index) => (
          <ComponentChart
            key={index}
            title={card.title}
            count={card.count}
            max={card.max || 0}
            icon={card.icon}
            color={card.color || "#1A3D61"}
          />
        ))}
      </div>
    </div>
  );
}