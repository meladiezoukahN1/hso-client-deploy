import { createSlice } from "@reduxjs/toolkit";
import { advertisements } from "./action";
import { Landing } from "landing";
import { toast } from "sonner";

const initialState: Landing = {
  advertisement: [],
  loading: true,
  error: "",
};

const LandingPage = createSlice({
  name: "landingForm",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(advertisements.pending, (state) => {
        state.loading = true;
      })
      .addCase(advertisements.fulfilled, (state, action) => {
        state.loading = false;
        state.advertisement = action.payload;
      })
      .addCase(advertisements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        toast.error(`${action.payload}`);
      });
  },
});

export default LandingPage.reducer;
