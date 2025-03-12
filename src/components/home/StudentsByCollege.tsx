"use client";
import React, { useState, useEffect } from "react";
import { getIcons } from "@/lib/jsons/home/colleges";
import { useAppSelector } from "@/hooks/redux-toolkit";
import { FacultyStat } from "home";

const CollegeStats = () => {
  const { statistics } = useAppSelector((state) => state.home);
  const [maxStudents, setMaxStudents] = useState<number>(0);

  useEffect(() => {
    if (statistics?.faculty_stats.length) {
      const totalStudents = statistics.faculty_stats.map(
        (faculty: FacultyStat) => faculty.female_count + faculty.male_count
      );
      setMaxStudents(Math.max(...totalStudents));
    }
  }, [statistics]);

  const getBarWidth = (value: number, max: number) => {
    return max > 0 ? `${(value / max) * 100}%` : "0%";
  };

  return (
    <div className="w-full md:w-1/2 px-4 md:mr-10 md:h-[450px]">
      <h1 className="font-cairo font-bold text-xl md:text-2xl mt-8 md:mt-12 mb-6 md:mb-8 text-[#1A3D61]">
        الطلاب حسب الكلية :
      </h1>
      <div className="space-y-4 md:space-y-6 mr-2 md:mr-5 max-h-[380px] overflow-y-auto">
        {!statistics ? (
          "لا توجد بيانات"
        ) : (
          statistics.faculty_stats.map((faculty: FacultyStat, index: number) => {
            const Icon = getIcons(faculty.name);
            return (
              <div key={index} className="flex flex-col md:flex-row py-1">
                <div className="flex items-center space-x-2 mb-2 md:mb-0 md:w-2/6">
                  <span className="text-xl md:text-2xl text-[#1A3D61] ml-2 w-5">
                    {Icon ? <Icon /> : null}
                  </span>
                  <span className="text-sm md:text-base font-bold text-[#1A3D61]">
                    {faculty.name}
                  </span>
                </div>

                <div className="w-full space-y-1">
                  <div className="flex items-center">
                    <div
                      className="bg-[#1A3D61] h-2 md:h-3 rounded"
                      style={{
                        width: getBarWidth(faculty.male_count, maxStudents),
                      }}
                    ></div>
                    <span className="text-xs md:text-sm font-medium text-[#1A3D61] mr-2">
                      {`طلاب - ${faculty.male_count}`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="bg-[#F5C337] h-2 md:h-3 rounded"
                      style={{
                        width: getBarWidth(faculty.female_count, maxStudents),
                      }}
                    ></div>
                    <span className="text-xs md:text-sm font-medium text-[#F5C337] mr-2">
                      {`طالبات - ${faculty.female_count}`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CollegeStats;