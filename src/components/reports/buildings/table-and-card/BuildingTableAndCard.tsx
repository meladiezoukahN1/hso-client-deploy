import { useState, useEffect } from "react";
import { BuildingTable } from "./BuildingTable";
import { SummaryCard } from "./SummaryCard";
import { useAppSelector } from "@/hooks/redux-toolkit";
import { RootState } from "@/lib/store";
import { BuildingData, BuildingDetails, Filters } from "reports";

export default function BuildingTableAndCardPage({
  filters,
  onDataChange,
}: {
  filters: Filters;
  onDataChange: (data: BuildingData[]) => void;
}) {
  const buildingData = useAppSelector(
    (state: RootState) => state.reports.buildingData
  );
  const [filteredData, setFilteredData] =
    useState<BuildingData[]>(buildingData);

  useEffect(() => {
    if (
      filters &&
      (filters.InputBuilding !== "none" ||
        filters.InputRoom !== "none" ||
        filters.roomState !== "none")
    ) {
      const filtered = buildingData
        .filter((building) => {
          const matchesBuilding =
            filters.InputBuilding === "none" ||
            filters.InputBuilding === "" ||
            building.name_building.includes(filters.InputBuilding);
          const matchesRoom =
            filters.InputRoom === "none" ||
            filters.InputRoom === "" ||
            building.data_student.some((student) =>
              student.room_name.includes(filters.InputRoom)
            );
          const matchesRoomState =
            filters.roomState === "none" ||
            filters.roomState === "" ||
            building.data_student.some((student) =>
              (student.room_state ?? "").includes(filters.roomState)
            );
          return matchesBuilding && matchesRoom && matchesRoomState;
        })
        .map((building) => ({
          ...building,
          data_student: building.data_student.filter((student) => {
            const matchesRoom =
              filters.InputRoom === "none" ||
              filters.InputRoom === "" ||
              student.room_name.includes(filters.InputRoom);
            const matchesRoomState =
              filters.roomState === "none" ||
              filters.roomState === "" ||
              (student.room_state ?? "").includes(filters.roomState);
            return matchesRoom && matchesRoomState;
          }),
        }));

      onDataChange(filtered);
      setFilteredData(filtered);
    } else {
      onDataChange(buildingData);
      setFilteredData(buildingData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, buildingData]);

  if (!filteredData || filteredData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="mt-10">
      {filteredData.map(
        (
          building: {
            id: number;
            name_building: string;
            data_student: BuildingDetails[];
            num_of_students: number;
            room_count_full: number;
            room_count_not_full: number;
          },
          index: number
        ) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start gap-x-8 mb-10"
          >
            <BuildingTable
              buildingName={building.name_building}
              details={building.data_student}
            />
            <SummaryCard summary={building} />
          </div>
        )
      )}
    </div>
  );
}
