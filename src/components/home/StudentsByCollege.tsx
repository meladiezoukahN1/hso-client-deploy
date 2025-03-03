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
    <div className="w-1/2 mr-10">
      <h1 className="font-cairo font-bold text-2xl mt-12 mb-8 text-primary-700">
        الطلاب حسب الكلية :
      </h1>
      <div className="space-y-6 mr-5 max-h-80 overflow-hidden"> 
        {!statistics ? (
          "لا توجد بيانات"
        ) : (
          statistics.faculty_stats.map((faculty: FacultyStat, index: number) => {
            const Icon = getIcons(faculty.name);
            return (
              <div key={index} className="flex py-1">
                <div className="flex-shrink-0 flex items-center space-x-2 w-2/6   ">
                  <span className="text-2xl text-gray-700 ml-2 w-5">
                    {Icon ? <Icon /> : null}
                  </span>
                  <span className="text-base font-bold">{faculty.name}</span>
                </div>

                <div className="w-full space-y-1">
                  <div className="flex items-center">
                    <div
                      className="bg-[#386F90] h-3 rounded w-4/6"
                      style={{
                        width: getBarWidth(faculty.male_count, maxStudents),
                      }}
                    ></div>
                    <span className="text-sm font-medium text-[#386F90] mr-2 w-2/6">
                      {`طلاب - ${faculty.male_count}`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="bg-[#DBB459] h-3 rounded"
                      style={{
                        width: getBarWidth(faculty.female_count, maxStudents),
                      }}
                    ></div>
                    <span className="text-sm font-medium text-[#DBB459] mr-2">
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
