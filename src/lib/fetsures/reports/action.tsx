import useAxios from "@/hooks/use-axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BuildingData,
  CityBasedReport,
  City,
  Faculty,
  StudyReportData,
  BuildingDetails,
} from "reports";

export const fetchCitiesReport = createAsyncThunk(
  "citiesReport/fetchCitiesReport",
  async (): Promise<BuildingDetails[]> => {
    const axios = await useAxios({ auth: true });

    try {
      const res = await axios.get("/api/getStudents");
      return res.data as BuildingDetails[];
    } catch (e) {
      throw e;
    }
  }
);

export const fetchBuildingData = createAsyncThunk(
  "reports/fetchBuildingData",
  async (): Promise<BuildingData[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const response = await axios.get("/api/buildingsRoomsReport");
      return response.data as BuildingData[];
    } catch (e) {
      console.error("Error fetching building data:", e);
      throw e;
    }
  }
);

export const fetchCityReport = createAsyncThunk(
  "cityReport/fetchCityReport",
  async (): Promise<CityBasedReport> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/cityReport");
      return res.data as CityBasedReport;
    } catch (e) {
      throw e;
    }
  }
);

export const fetchStudyReportData = createAsyncThunk(
  "reports/fetchStudyReportData",
  async (): Promise<StudyReportData[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const response = await axios.get("/api/expired");
      return response.data as StudyReportData[];
    } catch (e) {
      console.error("Error fetching study report data:", e);
      throw e;
    }
  }
);

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (): Promise<City[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/cities");
      return res.data as City[];
    } catch (e) {
      throw e;
    }
  }
);

export const fetchFaculties = createAsyncThunk(
  "faculties/fetchFaculties",
  async (): Promise<Faculty[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/faculties");
      return res.data.map((faculty: Faculty) => ({
        label: faculty.label,
        value: faculty.label,
      })) as Faculty[];
    } catch (e) {
      throw e;
    }
  }
);

export const fetchSelectBuildingData = createAsyncThunk(
  "report/get-building",
  async () => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/getBuildings");
      return res.data.map((building: { label: string }) => ({
        label: building.label,
        value: building.label,
      }));
    } catch (error) {
      return error;
    }
  }
);

export const fetchSelectRoomData = createAsyncThunk(
  "report/rooms",
  async () => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/rooms");
      return res.data.map((room: { label: string }) => ({
        label: room.label,
        value: room.label,
      }));
    } catch (error) {
      return error;
    }
  }
);

export const fetchSelectSemesterData = createAsyncThunk(
  "report/select=>acadimec-seasons",
  async () => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/report");
      return res.data.map((semester: { value: number; label: string }) => ({
        label: semester.label,
        value: semester.label,
      }));
    } catch (error) {
      console.error("Error fetching semester data:", error);
      return [];
    }
  }
);

export const fetchSelectPeriodeOfStudyData = createAsyncThunk(
  "report/get_semesters",
  async () => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/semesters");
      return res.data.map((period: { value: number; label: string }) => ({
        label: period.value,
        value: period.value,
      }));
    } catch (error) {
      console.error("Error fetching period of study data:", error);
      return [];
    }
  }
);
