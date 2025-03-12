"use client";
import React, { useEffect, useState } from "react";
import BuildingTableAndCardPage from "./table-and-card/BuildingTableAndCard";
import {
  fetchBuildingData,
  fetchSelectBuildingData,
  fetchSelectRoomData,
} from "@/lib/fetsures/reports/action";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { RootState } from "@/lib/store";
import SelectValueComponents from "@/components/ui/SelectValue";
import { BuildingData, Filters } from "reports";
import LoadingIcon from "@/components/ui/LoadingIcon";
import ExportToExcelButton from "@/components/ui/ExportToExcelButton";
import { statuRooms } from "@/lib/jsons/reports";

const exportColumns = [
  { header: "اسم المبنى", accessor: "buildingName" },
  { header: "رقم الملف", accessor: "file_no" },
  { header: "اسم الغرفة", accessor: "room_name" },
  { header: "الطابق", accessor: "room_floor" },
  { header: "حالة الغرفة", accessor: "room_status" },
];

const BuildingsReport: React.FC = () => {
  const dispatch = useAppDispatch();
  const { buildingData, status, error, buildingSelect, rooms } = useAppSelector(
    (state: RootState) => state.reports
  );

  const [filteredData, setFilteredData] = useState<BuildingData[]>([]);
  const [filters, setFilters] = useState<Filters>({
    InputBuilding: "",
    InputRoom: "",
    roomState: "",
  });

  useEffect(() => {
    dispatch(fetchBuildingData());
    dispatch(fetchSelectRoomData());
    dispatch(fetchSelectBuildingData());
  }, [dispatch]);

  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
  };

  const flattenedExportData = filteredData.flatMap((building) =>
    (building.data_student || []).map((student) => ({
      buildingName: building.name_building || "N/A",
      file_no: student.file_no || "N/A",
      student_name: student.student_name || "N/A",
      faculty_name: student.faculty_name || "N/A",
      studentID: student.studentID || "N/A",
      academic_season: student.academic_season || "N/A",
      room_name: student.room_name || "N/A",
      room_floor: student.room_floor || "N/A",
    }))
  );

  if (status === "loading") return <LoadingIcon ClassName="h-96" />;
  if (error) return <div>{error}</div>;
  if ((!buildingData || buildingData.length === 0) && status === "succeeded")
    return <div>لا توجد بيانات متاحة</div>;


  return (
    <div className="pt-8 md:px-24">
      <h1 className="text-3xl font-bold text-center">تقرير المباني و الغرف</h1>
      <div className="mt-8 flex justify-between md:gap-x-4">
        <SelectValueComponents
          title={"المباني"}
          data={buildingSelect}
          onValueChange={(value) => handleFilterChange("InputBuilding", value)}
        />
        <SelectValueComponents
          title={"حالة الغرف"}
          data={statuRooms}
          onValueChange={(value) => handleFilterChange("InputRoom", value)}
        />
        <SelectValueComponents
          title={"الغرف"}
          data={rooms}
          onValueChange={(value) => handleFilterChange("InputRoom", value)}
        />
      </div>

      <BuildingTableAndCardPage
        filters={filters}
        onDataChange={(data) => setFilteredData(data)}
      />

      <div className="mt-4 flex justify-end">
        <ExportToExcelButton
          data={flattenedExportData}
          columns={exportColumns}
          fileName="buildings_report.xlsx"
          label="تحميل الملف"
        />
      </div>
    </div>
  );
};

export default BuildingsReport;
