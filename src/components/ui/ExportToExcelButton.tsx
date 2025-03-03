import React from "react";
import { Button } from "@/components/ui/button";
import { BiDownload } from "react-icons/bi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { StudyReportData as StudyReportType } from "reports";

interface ExportToExcelButtonProps {
  data:
    | StudyReportType[]
    | {
        buildingName: string;
        file_no: string | number;
        student_name: string;
        faculty_name: string;
        studentID: string | number;
        academic_season: string;
        room_name: string;
        room_floor: string | number;
      }[];
  columns: { header: string; accessor: string }[];
  fileName?: string;
  label?: string;
  excludeColumns?: string[];
}

const ExportToExcelButton: React.FC<ExportToExcelButtonProps> = ({
  data,
  columns,
  fileName = "data.xlsx",
  label = "تحميل الملف",
  excludeColumns = [],
}) => {
  const exportToExcel = () => {
    const filteredColumns = columns.filter(
      (column) => !excludeColumns.includes(column.accessor)
    );

    const headers = filteredColumns.map((column) => column.header);

    const rows = data
      .map((item, index) => ({
        ...item,
        serial_number: index + 1,
      }))
      .map((item) =>
        filteredColumns.map(
          (column) => item[column.accessor as keyof typeof item]
        )
      );

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, fileName);
  };

  return (
    <Button
      onClick={exportToExcel}
      variant="default"
      className="px-6 bg-yellow-300 hover:bg-yellow-400 hover:text-white text-black font-bold"
    >
      <BiDownload />
      {label}
    </Button>
  );
};

export default ExportToExcelButton;
