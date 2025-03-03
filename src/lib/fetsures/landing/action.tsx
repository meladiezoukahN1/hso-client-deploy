import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "@/hooks/use-axios";
import { Advertisements } from "landing";

export const advertisements = createAsyncThunk<Advertisements[], void>(
  "landing/get-advertisements",
  async () => {
    const axios = await useAxios();
    try {
      const res = await axios.get("/advertisement");
      return res.data;
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
