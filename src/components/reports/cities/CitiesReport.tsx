// components/reports/CityStatistics.jsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  fetchCitiesReport,
  fetchCityReport,
  fetchCities,
  fetchFaculties,
} from "@/lib/fetsures/reports/action";
import LoadingIcon from "@/components/ui/LoadingIcon";
import { CityCard } from "./ui/CityCard";
import { BarChart } from "./ui/BarChart";
import { CityListCard } from "./ui/CityListCard";

const CitiesReport = () => {
  const dispatch = useAppDispatch();
  const { status, cityReport, error } = useAppSelector(
    (state) => state.reports
  );

  useEffect(() => {
    dispatch(fetchCitiesReport());
    dispatch(fetchCityReport());
    dispatch(fetchCities());
    dispatch(fetchFaculties());
  }, [dispatch]);

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (status === "loading") return <LoadingIcon ClassName="h-96" />;

  const highestCity = cityReport?.city_with_the_most_students;
  const lowestCity = cityReport?.city_with_the_fewest_students;
  const totalStudents =
    cityReport?.data.reduce((acc, city) => acc + city.total_students, 0) || 0;
  const highestCityProgress = highestCity
    ? (highestCity.total_students / totalStudents) * 100
    : 0;
  const lowestCityProgress = lowestCity
    ? (lowestCity.total_students / totalStudents) * 100
    : 0;

  if (status === "succeeded" && totalStudents === 0)
    return (
      <div className="flex min-h-96 items-center justify-center">
        لا يوجد طلاب من أي مدينة
      </div>
    );
  return (
    <div className="pt-8 md:px-24">
      <h1 className="text-3xl font-bold text-center">تقرير المدن</h1>
      <div className="mt-8 flex flex-wrap md:flex-nowrap gap-x-6 items-start">
        <div className="grow mb-4">
          <div className="flex gap-x-6">
            <CityCard
              city={highestCity ? highestCity.city : ""}
              value={highestCity ? highestCity.total_students : 0}
              progress={highestCity ? highestCityProgress : 0}
              label="أعلى المدن"
            />
            <CityCard
              city={lowestCity ? lowestCity.city : ""}
              value={lowestCity ? lowestCity.total_students : 0}
              progress={lowestCity ? lowestCityProgress : 0}
              label="أقل المدن"
            />
          </div>
          <BarChart
            labels={cityReport?.data?.map((city) => city.city) || []}
            requestData={cityReport?.data?.map((city) => city.male_count) || []}
            inquiryData={
              cityReport?.data?.map((city) => city.female_count) || []
            }
          />
        </div>
        <div className="w-full md:w-[400px]">
          <CityListCard
            cities={
              cityReport?.data?.map((city) => ({
                name: city.city,
                value: city.total_students,
              })) || []
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CitiesReport;
