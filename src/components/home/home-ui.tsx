"use client";
import { useEffect } from "react";
import DashboardCards from "@/components/home/card-statistics/Card-Statistics";
import CollegeStats from "./StudentsByCollege";
import CardRecentActivities from "./card-recent-activities/Card-RecentActivities";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { getStatistics, lastActivities } from "@/lib/fetsures/home/action";
import { Spinner } from "@nextui-org/react";

export default function HomeUI() {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.home);
  useEffect(() => {
    dispatch(getStatistics());
    dispatch(lastActivities());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner size="md" />
      </div>
    );
  }
  if (error)
    return (
      <div className="flex justify-center w-full items-center">{error}</div>
    );
  return (
    <div className="p-1">
      <DashboardCards />
      <div className="flex items-start">
        <CollegeStats />
        <CardRecentActivities />
      </div>
    </div>
  );
}
