import InfoDetailsCard from "./InfoDetailsCard";
import { useAppSelector } from "@/hooks/redux-toolkit";

export default function CardRecentActivities() {
  const { LastActivites } = useAppSelector((state) => state.home);

  return (
    <div className="w-full md:w-1/2 border-t-2 md:border-t-0 md:border-r-2 border-[#1A3D61] mt-8 md:mt-12 pt-6 md:pt-0 px-4 md:pr-6 md:h-[450px]">
      <h1 className="font-cairo text-[#1A3D61] font-bold text-xl md:text-2xl mb-6 md:mb-8">
        النشاطات الأخيرة :
      </h1>
      <div className="flex flex-col gap-4 mt-4 md:mt-16justify-center max-h-[380px] overflow-y-auto ">
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