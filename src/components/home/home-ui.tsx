"use client";
import { useEffect } from "react";
import DashboardCards from "@/components/home/card-statistics/Card-Statistics";
import CollegeStats from "./StudentsByCollege";
import CardRecentActivities from "./card-recent-activities/Card-RecentActivities";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { getStatistics, lastActivities } from "@/lib/fetsures/home/action";
import { LoadingIcon } from "../ui";

export default function HomeUI() {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.home);
  useEffect(() => {
    dispatch(getStatistics());
    dispatch(lastActivities());
  }, [dispatch]);

  if (isLoading) return <LoadingIcon />;

  if (error)
    return (
      <div className="flex justify-center w-full items-center">{error}</div>
    );
  return (
    <div className="p-1">
      <DashboardCards />
      <div className="flex flex-col md:flex-row items-start">
        <CollegeStats />
        <CardRecentActivities />
      </div>
    </div>
  );
}
