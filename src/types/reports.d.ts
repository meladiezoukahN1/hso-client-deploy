declare module "reports" {
  import { Dispatch, SetStateAction } from "react";
  import { Select } from "state";

  interface CitiesReportState {
    data: BuildingDetails[];
    cityReport: CityBasedReport | null;
    isLoading: boolean;
    cities: City[];
    faculties: Faculty[];
    buildingData: BuildingData[];
    filterBuildingData: BuildingData[];
    studyReportData: StudyReportData[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    season: Select[];
    buildingSelect: Select[];
    rooms: Select[];
  }
  export interface TypesOfReports {
    title: string;
    path: string;
  }

  export interface NameOfReport extends TypesOfReports {
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
  }

  export interface SelectOption {
    label: string;
    value: string;
  }

  // export interface SelectSearchReportProps {}
  export interface SelectProps {
    title: string;
    dataSelecte: SelectOption[];
  }

  export interface CityData {
    city: string;
    total_students: number;
    male_count: string;
    female_count: string;
    foreign_count: string;
    percentage: number;
    foreign_percentage: number;
  }

  export interface BuildingData {
    id: number;
    name_building: string;
    data_student: BuildingDetails[];
    summary: {
      num_of_students: number;
      room_count_full: number;
      room_count_not_full: number;
    };
  }

  export interface BuildingDetails {
    fileNo: number;
    full_name: string;
    studentID: number;
    city_name: string;
    gender: string;
    building_name: string;
    room_name: string;
    faculty_name: string;
  }
  export interface BuildingData {
    id: number;
    name_building: string;
    data_student: BuildingDetails[];

    // summary: {
    num_of_students: number;
    room_count_full: number;
    room_count_not_full: number;
  }
  export interface BuildingDetails {
    file_no: number;
    student_name: string;
    faculty_name: string;
    studentID: number;
    academic_season: string;
    room_name: string;
    room_floor: number;
    room_state?: string;
  }

  export interface CityBasedReport {
    message: string;
    city_with_the_most_students: {
      city: string;
      total_students: number;
    };
    city_with_the_fewest_students: {
      city: string;
      total_students: number;
    };
    data: {
      city: string;
      total_students: number;
      male_count: number;
      female_count: number;
    }[];
  }

  export interface Filters {
    InputBuilding: string;
    InputRoom: string;
    roomState: string;
  }

  export interface BuildingProps {
    data: BuildingData;
  }

  export interface BuildingProps {
    data: BuildingData;
  }

  // New interfaces for cities and faculties
  export interface City {
    value: string;
    label: string;
  }

  export interface Faculty {
    value: string;
    label: string;
  }
  // uadated with the data in the json file
  export interface StudyReportData {
    fileNo: number;
    studentName: string;
    facultyName: string;
    studentID: number;
    academicSeason: string | null;
    remainingSemesters: string | number;
    status: boolean;
  }

  export interface CollegeData {
    label: string;
    value: string;
  }
}
