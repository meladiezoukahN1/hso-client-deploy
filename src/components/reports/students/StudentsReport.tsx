"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  fetchCitiesReport,
  fetchCityReport,
  fetchCities,
  fetchFaculties,
} from "@/lib/fetsures/reports/action";
import { RootState } from "@/lib/store";
import SelectValueComponents from "@/components/ui/SelectValue";
import GeneralTable from "@/components/ui/GeneralTable";
import { columnsCityStudents, genderOptions } from "@/lib/jsons/reports";
import LoadingIcon from "@/components/ui/LoadingIcon";
import { BuildingDetails } from "reports";
import PaginationComponent from "@/components/ui/paginationComponent";

const StudentsTable = () => {
  const dispatch = useAppDispatch();
  const { status, data, error, cities, faculties } = useAppSelector(
    (state: RootState) => state.reports
  );
  const [filteredData, setFilteredData] = useState<BuildingDetails[]>([]);
  const [selectCity, setCity] = useState("");
  const [selectFaculty, setFaculty] = useState("");
  const [selectGender, setGender] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const cityOptions = cities.map((city) => ({
    value: city.label,
    label: city.label,
  }));

  const facultyOptions = faculties.map((faculty) => ({
    value: faculty.label,
    label: faculty.label,
  }));

  useEffect(() => {
    dispatch(fetchCitiesReport());
    dispatch(fetchCityReport());
    dispatch(fetchCities());
    dispatch(fetchFaculties());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      // Assuming data is an array of building details (flatten if needed)
      const flattenedDetails = data.flatMap((item) => item);
      let Data = [...flattenedDetails];

      if (selectCity.trim() && selectCity !== "none") {
        Data = Data.filter((item) => item.city_name === selectCity);
      }

      if (selectFaculty.trim() && selectFaculty !== "none") {
        Data = Data.filter((item) => item.faculty_name === selectFaculty);
      }

      if (selectGender.trim() && selectGender !== "none") {
        Data = Data.filter((item) => item.gender === selectGender);
      }
      setFilteredData(Data);
      setCurrentPage(1); // reset to first page when filters change
    }
  }, [data, selectCity, selectFaculty, selectGender, status]);

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (status !== "succeeded") {
    return <LoadingIcon ClassName="h-96" />;
  }

  const dataWithIndex = filteredData.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataWithIndex.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="pt-8 md:px-24">
      <h1 className="md:text-3xl text-xl font-bold text-center">عرض الطلبة</h1>
      <div className="mt-10 flex justify-between gap-1">
        <SelectValueComponents
          title="المدينة"
          data={cityOptions}
          onValueChange={(value) => setCity(value)}
        />
        <SelectValueComponents
          title="الكلية"
          data={facultyOptions}
          onValueChange={(value) => setFaculty(value)}
        />
        <SelectValueComponents
          title="الجنس"
          data={genderOptions}
          onValueChange={(value) => setGender(value)}
        />
      </div>

      <div className="mt-4">
        <GeneralTable
          classNameTH="py-1 md:py-3"
          columns={columnsCityStudents}
          data={currentItems}
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

export default StudentsTable;
