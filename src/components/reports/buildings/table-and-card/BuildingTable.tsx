import React, { useState } from "react";
import { BuildingData } from "reports";
import { columnsBuilding } from "@/lib/jsons/reports";
import GeneralTable from "@/components/ui/GeneralTable";
import PaginationComponent from "@/components/ui/paginationComponent";

interface BuildingTableProps {
  details: BuildingData["data_student"];
  buildingName: string;
}

export const BuildingTable: React.FC<BuildingTableProps> = ({
  buildingName,
  details,
}) => {
  // Add serial numbers to the details
  const dataWithSerialNumbers = details.map((item, index) => ({
    ...item,
    serial_number: index + 1,
  }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Calculate pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataWithSerialNumbers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(dataWithSerialNumbers.length / itemsPerPage);

  return (
    <div className="w-full">
      <h2 className="text-2xl text-secondary mb-4">
        {`المبنى ${buildingName}`}
      </h2>
      <GeneralTable columns={columnsBuilding} data={currentItems} />
      <div className="mt-4 flex justify-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
