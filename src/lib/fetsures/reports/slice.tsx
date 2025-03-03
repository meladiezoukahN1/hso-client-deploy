import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCitiesReport,
  fetchCityReport,
  fetchCities,
  fetchFaculties,
  fetchBuildingData,
  fetchStudyReportData,
  fetchSelectPeriodeOfStudyData,
  fetchSelectSemesterData,
  fetchSelectBuildingData,
  fetchSelectRoomData,
} from "./action";
import { CitiesReportState } from "reports";

const initialState: CitiesReportState = {
  data: [],
  cityReport: null,
  status: "idle",
  error: null,
  isLoading: false,
  cities: [],
  faculties: [],
  buildingData: [],
  studyReportData: [],
  filterBuildingData: [],
  season: [],
  buildingSelect: [],
  rooms: [],
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitiesReport.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchCitiesReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCitiesReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        state.isLoading = false;
      })
      .addCase(fetchCityReport.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchCityReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cityReport = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCityReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        state.isLoading = false;
      })
      .addCase(fetchCities.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cities = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        state.isLoading = false;
      })
      .addCase(fetchFaculties.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchFaculties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.faculties = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFaculties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        state.isLoading = false;
      })
      .addCase(fetchBuildingData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBuildingData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.buildingData = action.payload;
      })
      .addCase(fetchBuildingData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      // Study Report Data
      .addCase(fetchStudyReportData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudyReportData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studyReportData = action.payload;
      })
      .addCase(fetchStudyReportData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })

      .addCase(fetchSelectPeriodeOfStudyData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSelectPeriodeOfStudyData.fulfilled, (state) => {
        state.status = "succeeded";
        // state.buildingData = action.payload;
      })
      .addCase(fetchSelectPeriodeOfStudyData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })

      .addCase(fetchSelectSemesterData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSelectSemesterData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.season = action.payload;
      })
      .addCase(fetchSelectSemesterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })

      .addCase(fetchSelectBuildingData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSelectBuildingData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.buildingSelect = action.payload;
      })
      .addCase(fetchSelectBuildingData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })

      // building select
      .addCase(fetchSelectRoomData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSelectRoomData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchSelectRoomData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default reportsSlice.reducer;
