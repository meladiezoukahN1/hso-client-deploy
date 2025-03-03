"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { getStudents, getFaculties } from "@/lib/fetsures/management/action";
import GeneralTable from "@/components/ui/GeneralTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Students } from "mangement";
import SelectValueComponents from "@/components/ui/SelectValue";
import { columnsManagements } from "@/lib/jsons/mangement/students";
import PaginationComponent from "@/components/ui/paginationComponent";

const StudentManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const students = useSelector((state: RootState) => state.mangement.students);
  const faculties = useSelector(
    (state: RootState) => state.mangement.faculties
  );
  const status = useSelector((state: RootState) => state.mangement.status);
  const [filteredData, setFilteredData] = useState<Students[]>([]);

  const facultyOptions = faculties.map((faculty) => ({
    value: faculty.label,
    label: faculty.label,
  }));
  const [selectFaculty, setFaculty] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getFaculties());
  }, [dispatch]);

  useEffect(() => {
    let filteredStudents = [...students];

    if (
      selectFaculty.trim() &&
      selectFaculty !== "" &&
      selectFaculty !== "none"
    ) {
      filteredStudents = filteredStudents.filter(
        (student) => student.faculty_name === selectFaculty
      );
    }
    setFilteredData(filteredStudents);
  }, [status, students, selectFaculty]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  const handleFaculty = (value: string) => {
    setFaculty(value);
  };

  // Add serial numbers to the data
  const dataWithIndex = filteredData.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  // Pagination logic: slice the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataWithIndex.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataWithIndex.length / itemsPerPage);

  return (
    <div className="pt-8 px-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">السكان</h1>
        <SelectValueComponents
          title="الكلية"
          data={facultyOptions}
          onValueChange={handleFaculty}
        />
      </div>

      <div className="mt-6">
        <GeneralTable
          columns={columnsManagements}
          data={currentItems}
          classNameTH="m-0 p-2"
          renderCell={(row, column) => {
            if (column === "link") {
              return (
                <Link href={`StudentManagement/${row["fileNo"]}`}>
                  <Button className="w-24 h-10 bg-secondary hover:bg-secondary-600">
                    تعديل
                  </Button>
                </Link>
              );
            }
            if (column === "status") {
              return row["status"] === "Active"
                ? "قيد الدراسة"
                : "تم اكمال الدراسة";
            }
            return row[column as keyof typeof row];
          }}
        />
      </div>

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

export default StudentManagement;
