import InfoDetailsCard from "./InfoDetailsCard";
import { useAppSelector } from "@/hooks/redux-toolkit";

export default function CardRecentActivities() {
  const { LastActivites } = useAppSelector((state) => state.home);

  return (
    <div className="w-1/2 border-r-5 border-[#D9D9D9] mt-12 pr-6">
      <h1 className="font-cairo text-primary-700 font-bold text-2xl mb-8 ">
        النشاطات الأخيرة :
      </h1>
      <div className="flex flex-col gap-4 mt-4">
        <InfoDetailsCard
          title={"طلبات جديدة"}
          details={LastActivites.ReqNotifications}
        />

        <InfoDetailsCard
          title={"مستنفذي المدة"}
          details={LastActivites.RemNotifications}
        />

        <InfoDetailsCard
          title={"تخصيص غرف"}
          details={LastActivites.activityLogs}
        />
      </div>
    </div>
  );
}
