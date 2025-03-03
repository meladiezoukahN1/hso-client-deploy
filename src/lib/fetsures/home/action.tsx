import { LastActivity, Statistics } from "home";
import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "@/hooks/use-axios";

export const getStatistics = createAsyncThunk(
  "home/getStatistics",
  async (): Promise<Statistics> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/statistics");
      return res.data as Statistics;
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const lastActivities = createAsyncThunk(
  "home/activites",
  async (): Promise<LastActivity> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/lastActivity");
      return res.data as LastActivity;
    } catch (error) {
      throw handleError(error);
    }
  }
);

function handleError(error: unknown): Error {
  if (error instanceof Error) {
    return new Error(error.message || "حدث خطأ ما");
  } else {
    return new Error("حدث خطأ غير معروف");
  }
}
