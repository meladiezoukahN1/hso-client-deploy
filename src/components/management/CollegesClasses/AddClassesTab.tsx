"use client";

import { useState, useEffect } from "react";
import { RootState } from "@/lib/store"; // Adjust the import path as needed
import AddClass from "./addClass";
import { getShowFaculties } from "@/lib/fetsures/management/action";
import { SelectProps, ShowFaculties } from "mangement";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import SelectValueComponents from "@/components/ui/SelectValue";
import LoadingIcon from "@/components/ui/LoadingIcon";
import Image from "next/image";
import PaginationComponent from "@/components/ui/paginationComponent";

function AddClassesTab() {
  const dispatch = useAppDispatch();
  const { faculties, isLoading, error } = useAppSelector(
    (state: RootState) => state.mangement
  );

  const [selectCollage, setSelectCollage] = useState<SelectProps[]>([]);
  const [filteredCollage, setFilteredCollage] = useState<ShowFaculties[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(getShowFaculties());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(faculties) && faculties.length > 0) {
      const options = faculties.map((faculty) => ({
        label: faculty.value,
        value: String(faculty.label),
      }));
      setSelectCollage(options);
      setFilteredCollage(faculties);
    }
  }, [faculties]);

  // Reset pagination when filtered data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCollage]);

  const handleFilterChange = (selectedValue: string) => {
    if (selectedValue === "none") {
      setFilteredCollage(faculties);
    } else {
      const filtered = faculties.filter(
        (faculty) => String(faculty.label) === selectedValue
      );
      setFilteredCollage(filtered);
    }
  };

  if (error) return <div>حدث خطأ أثناء جلب البيانات</div>;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollage.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCollage.length / itemsPerPage);

  return (
    <div className="mt-16">
      <SelectValueComponents
        title="الكلية"
        data={selectCollage}
        onValueChange={handleFilterChange}
      />

      {isLoading && filteredCollage.length === 0 ? (
        <LoadingIcon ClassName="h-48" />
      ) : (
        ""
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {currentItems.length > 0
          ? currentItems.map((faculty: ShowFaculties, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center h-40 max-h-40"
              >
                <Image
                  width={400}
                  height={400}
                  src={`${
                    faculty.image
                      ? process.env.NEXT_PUBLIC_API_URL + faculty.image
                      : "/#"
                  }`}
                  alt={"جاري تحميل الصورة ..."}
                  className="mb-4 object-cover size-32"
                  priority
                />

                <div className="flex items-center justify-between space-x-2 h-8">
                  <span className="text-secondary mr-12">{faculty.value}</span>
                  <AddClass faclty={faculty} />
                </div>
              </div>
            ))
          : ""}
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
}

export default AddClassesTab;
