"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import TitleSection from "@/components/students/ui/title-section";
import { Button } from "@/components/ui/button";
import GeneralTable from "@/components/ui/GeneralTable";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { PendingRequests } from "@/lib/fetsures/students/action";
import PaginationComponent from "@/components/ui/paginationComponent";
import { LoadingIcon } from "../ui";

const StudentRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const { requestes, loading } = useAppSelector((state) => state.student);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Fixed items per page

  useEffect(() => {
    dispatch(PendingRequests()); // Fetch requests on component mount
  }, [dispatch]);

  const columns = [
    { header: "رقم الطلب", accessor: "rowNumber" },
    { header: "الاسم", accessor: "name" },
    { header: "التاريخ", accessor: "DOB" },
    { header: "الكلية", accessor: "faculty" },
    { header: "الطلب", accessor: "ReqID" },
  ];

  // Ensure data is available before mapping
  const requestsWithIndex =
    requestes?.map((req, idx) => ({
      ...req,
      rowNumber: idx + 1,
    })) || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requestsWithIndex.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(requestsWithIndex.length / itemsPerPage);

  return (
    <div className="font-bold">
      <TitleSection
        title="قبـــول الطلبات"
        className="md:mr-[400px] mb-4 text-[#1A3D61]"
      />
      {loading ? (
        <LoadingIcon />
      ) : requestes?.length === 0 ? (
        <div dir="rtl" className="p-6 flex justify-center h-96 items-center">
          لا توجد طلبات متاحة حاليًا.
        </div>
      ) : (
        <div dir="rtl" className="md:p-4 space-y-12">
          <div className="max-w-5xl mx-auto">
            <GeneralTable
              columns={columns}
              data={currentItems}
              classNameTH="p-2"
              renderCell={(row, column) => {
                if (column === "rowNumber") return row.rowNumber;
                if (column === "ReqID") {
                  return (
                    <Link href={`/students/requests/${row["ReqID"]}`}>
                      <Button className="w-24 bg-primary-700 hover:bg-primary-600">
                        عرض
                      </Button>
                    </Link>
                  );
                }
                return row[column as keyof typeof row];
              }}
            />
            {totalPages > 1 && (
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRequests;
