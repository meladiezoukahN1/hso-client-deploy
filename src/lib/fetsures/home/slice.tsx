import { HomeState } from "home";
import { getStatistics, lastActivities } from "./action";
import { toast } from "sonner";
import { createSlice } from "@reduxjs/toolkit";

const initialState: HomeState = {
  statistics: null,
  isLoading: false,
  error: null,
  LastActivites: {
    ReqNotifications: [],
    RemNotifications: [],
    activityLogs: [],
  },
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.statistics = action.payload;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "حدث خطأ ما";
      })
      .addCase(lastActivities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(lastActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.LastActivites = action.payload;
      })
      .addCase(lastActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "حدث خطأ ما";
      });
  },
});

export default homeSlice.reducer;
