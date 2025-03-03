"use client";

import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import EditClass from "./Editclass";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { getAcademicSeasons } from "@/lib/fetsures/management/action";
import { AcademicSeasons, SelectProps } from "mangement";
import GeneralTable from "@/components/ui/GeneralTable";
import { columnsEditSeason } from "@/lib/jsons/mangement/CollegesClassesTabs";
import LoadingIcon from "@/components/ui/LoadingIcon";
import SelectValueComponents from "@/components/ui/SelectValue";
import PaginationComponent from "@/components/ui/paginationComponent";

function ShowClassesTab() {
  const dispatch = useDispatch<AppDispatch>();
  const { academicSeasons, isLoading } = useSelector(
    (state: RootState) => state.mangement
  );

  // For editing
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRow, setCurrentRow] = useState<AcademicSeasons | null>(null);

  // For collage filter
  const [selectCollage, setSelectCollage] = useState<SelectProps[]>([]);
  const [filteredSeasons, setFilteredSeasons] = useState<AcademicSeasons[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (academicSeasons.length === 0) {
      dispatch(getAcademicSeasons());
    } else {
      // Create unique collage filter options from academicSeasons (assuming each has a `collage` property)
      const collageSet = new Set(
        academicSeasons.map((item) => item.faculty_name)
      );
      const options = Array.from(collageSet).map((collage) => ({
        label: collage,
        value: collage,
      }));
      setSelectCollage(options);
      setFilteredSeasons(academicSeasons);
    }
  }, [dispatch, academicSeasons]);

  // Reset pagination when filtered data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredSeasons]);

  const handleFilterChange = (selectedValue: string) => {
    if (selectedValue === "none") {
      setFilteredSeasons(academicSeasons);
    } else {
      const filtered = academicSeasons.filter(
        (season) => season.faculty_name === selectedValue
      );
      setFilteredSeasons(filtered);
    }
  };

  const handleEditClick = (row: AcademicSeasons) => {
    setCurrentRow(row);
    setOpenDialog(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSeasons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSeasons.length / itemsPerPage);

  return (
    <div className="mt-10">
      <SelectValueComponents
        title="الكلية"
        data={selectCollage}
        onValueChange={handleFilterChange}
      />
      {isLoading ? (
        <LoadingIcon ClassName="h-48" />
      ) : (
        <div className="mt-10">
          <GeneralTable
            columns={columnsEditSeason}
            data={currentItems}
            classNameTH="p-2"
            renderCell={(row, column) => {
              if (column === "edit") {
                return (
                  <Button
                    onClick={() => handleEditClick(row)}
                    className="text-secondary hover:text-secondary-600"
                  >
                    <FaEdit />
                  </Button>
                );
              }
              return row[column as keyof typeof row];
            }}
          />

          <div className="mt-4 flex justify-center">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          {openDialog && currentRow && (
            <EditClass row={currentRow} onClose={() => setOpenDialog(false)} />
          )}
        </div>
      )}
    </div>
  );
}

export default ShowClassesTab;
