"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import GeneralTable from "@/components/ui/GeneralTable";
import SelectValueComponents from "@/components/ui/SelectValue";
import ExportToExcelButton from "@/components/ui/ExportToExcelButton";
import {
  columnsPeriodOfStudy,
  selectStateDataReports,
  DurationExhausted,
  academic_season,
} from "@/lib/jsons/reports";
import {
  fetchStudyReportData,
  fetchSelectPeriodeOfStudyData,
  fetchFaculties,
} from "@/lib/fetsures/reports/action";
import { RootState } from "@/lib/store";
import { StudyReportData as StudyReportType } from "reports";
import PaginationComponent from "@/components/ui/paginationComponent";

const ExhaustedReport = () => {
  const dispatch = useAppDispatch();
  const { studyReportData, error, faculties } = useAppSelector(
    (state: RootState) => state.reports
  );

  // Initialize filters – note that INstatus is null until set.
  const [filters, setFilters] = useState<{
    INfacultyName: string;
    INstatus: boolean | null;
    INremainingSemesters: string;
    INacademicSeason: string;
  }>({
    INfacultyName: "",
    INstatus: null,
    INremainingSemesters: "",
    INacademicSeason: "",
  });

  const [filteredData, setFilteredData] = useState<StudyReportType[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    // Fetch the report data plus the extra filter data needed
    dispatch(fetchStudyReportData());
    dispatch(fetchSelectPeriodeOfStudyData());
    dispatch(fetchFaculties());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(studyReportData);
  }, [studyReportData]);

  const handleFilterChange = (filterName: string, value: string) => {
    // For the "الحالة" filter, convert string values to boolean or null
    let newValue: string | boolean | null;
    if (filterName === "INstatus") {
      newValue = value === "true" ? true : value === "false" ? false : null;
    } else {
      newValue = value;
    }
    const newFilters = { ...filters, [filterName]: newValue };
    setFilters(newFilters);

    // Filter the studyReportData using the updated filters
    const filtered = studyReportData.filter((item) => {
      return (
        (newFilters.INfacultyName && newFilters.INfacultyName !== "none"
          ? item.facultyName === newFilters.INfacultyName
          : true) &&
        (newFilters.INremainingSemesters &&
        newFilters.INremainingSemesters !== "none"
          ? item.remainingSemesters === newFilters.INremainingSemesters
          : true) &&
        (newFilters.INstatus !== null
          ? item.status === newFilters.INstatus
          : true) &&
        (newFilters.INacademicSeason && newFilters.INacademicSeason !== "none"
          ? item.academicSeason === newFilters.INacademicSeason
          : true)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  if (error) return <div>{error}</div>;
  if (!studyReportData || studyReportData.length === 0)
    return <div>No data available</div>;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="pt-8 px-24">
      <h1 className="text-3xl font-bold text-center">
        تقرير مستنفدي مدة الدراسة
      </h1>
      <div className="mt-10 flex justify-between items-center">
        <SelectValueComponents
          title="الكلية"
          data={faculties}
          onValueChange={(value) => handleFilterChange("INfacultyName", value)}
        />
        <SelectValueComponents
          title="المدة المستنفدة"
          data={DurationExhausted}
          onValueChange={(value) =>
            handleFilterChange("INremainingSemesters", value)
          }
        />
        <SelectValueComponents
          title="الحالة"
          data={selectStateDataReports}
          onValueChange={(value) => handleFilterChange("INstatus", value)}
        />
        <SelectValueComponents
          title="الفصل الدراسي"
          data={academic_season}
          onValueChange={(value) =>
            handleFilterChange("INacademicSeason", value)
          }
        />
      </div>
      <div className="my-6">
        <div className="flex gap-4">
          <div className="flex items-center">
            <span className="w-8 h-3 bg-red-500 rounded-full ml-2"></span>
            <span>استنفد</span>
          </div>
          <div className="flex items-center">
            <span className="w-8 h-3 bg-yellow-300 rounded-full ml-2"></span>
            <span>على وشك الاستنفاد</span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <GeneralTable
          columns={columnsPeriodOfStudy}
          data={currentItems}
          renderCell={(row, column) => {
            if (column === "status") {
              return (
                <div className="flex items-center">
                  <span
                    className={`w-8 h-3 rounded-full ml-2 ${
                      row[column] ? "bg-yellow-300" : "bg-red-500"
                    }`}
                  ></span>
                </div>
              );
            }
            return row[column as keyof StudyReportType] !== undefined
              ? String(row[column as keyof StudyReportType])
              : null;
          }}
        />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <ExportToExcelButton
          data={filteredData}
          columns={columnsPeriodOfStudy}
          excludeColumns={["status"]}
          fileName="filtered_data.xlsx"
        />
      </div>
    </div>
  );
};

export default ExhaustedReport;
