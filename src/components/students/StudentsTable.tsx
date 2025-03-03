"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import TitleSection from "@/components/students/ui/title-section";
import { Button } from "@/components/ui/button";
import { stateStudentSelect, columns } from "@/lib/jsons/studens";
import GeneralTable from "../ui/GeneralTable";
import SelectValueComponents from "../ui/SelectValue";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { CollageSelect, Students } from "student";
import { Collage, getStudent } from "@/lib/fetsures/students/action";
import LoadingIcon from "../ui/LoadingIcon";
import PaginationComponent from "../ui/paginationComponent";

const StudentsTable: React.FC = () => {
  const [filterStateStudent, setFilterStateStudent] = useState<Students[]>([]);
  const [filterCollage, setFilterCollage] = useState<CollageSelect[]>([]);
  const [selectStatus] = useState<string>("");
  const [selectCollege, setCollage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const dispatch = useAppDispatch();
  const { student, status, collage } = useAppSelector((state) => state.student);

  const handelStatus = (value: string) => {
    setCollage(value);
    setCurrentPage(1);
  };

  const handelCollage = (value: string) => {
    setCollage(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(Collage());
    dispatch(getStudent());
  }, [dispatch]);

  useEffect(() => {
    setFilterStateStudent(student);
    const SetData = collage.map((ele) => ({
      label: ele.value,
      value: ele.value,
    }));
    setFilterCollage(SetData);
  }, [student, collage]);

  useEffect(() => {
    let Data = [...student];

    if (selectStatus.trim() && selectStatus !== "none") {
      Data = Data.filter((student) => student.status === selectStatus);
    }

    if (selectCollege.trim() && selectCollege !== "none") {
      Data = Data.filter((student) => student.faculty_name === selectCollege);
    }

    setFilterStateStudent(Data);
    setCurrentPage(1);
  }, [student, selectCollege, selectStatus]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterStateStudent.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filterStateStudent.length / itemsPerPage);

  return (
    <div className="font-bold mt-5">
      <div className="flex items-center mb-4">
        <TitleSection title=" قائمة الطلبة :" className="mr-4 text-[#1A3D61]" />
        <div className="flex justify-between space-x-4">
          <SelectValueComponents
            title="الكلية"
            data={filterCollage}
            onValueChange={handelCollage}
            ClassName="mr-36 ml-14 w-80"
          />
          <SelectValueComponents
            title="الحالة الدراسية"
            data={stateStudentSelect}
            onValueChange={handelStatus}
            ClassName="w-80"
          />
        </div>
      </div>

      {status === "succeeded" ? (
        <>
          <div dir="rtl" className="mx-10">
            <GeneralTable
              columns={columns}
              data={currentItems}
              classNameTH={"p-2"}
              renderCell={(row, column) => {
                if (column === "studentID") {
                  return (
                    <Link href={`/students/studentsTable/${row["fileNo"]}`}>
                      <Button className="w-24 bg-primary-700 hover:bg-primary-500">عرض</Button>
                    </Link>
                  );
                }
                if (column === "status") {
                  return row["status"] === "Active"
                    ? "قيد الدراسة"
                    : "تم إكمال الدراسة";
                }
                return row[column as keyof typeof row];
              }}
            />
          </div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <LoadingIcon ClassName="h-96" />
      )}
    </div>
  );
};

export default StudentsTable;
