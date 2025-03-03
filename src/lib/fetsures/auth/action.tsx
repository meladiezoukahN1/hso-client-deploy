import useAxios from "@/hooks/use-axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import handleError from "@/hooks/handleError";

interface Login {
  username: string;
  password: string;
}

interface Verify {
  message: string;
  token: string;
}

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ username, password }: Login) => {
    const axios = await useAxios();
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const checkEmialAction = createAsyncThunk(
  "check Emial",
  async (email: string) => {
    const axios = await useAxios();
    try {
      const response = await axios.post("/checkemail", { email: email });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const verifyOPT = createAsyncThunk(
  "verify OTP",
  async ({ email, otp }: { email: string; otp: string }): Promise<Verify> => {
    const axios = await useAxios();
    try {
      const response = await axios.post("/verifyotp", { email, otp });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  }
);

// export const Repassword = createAsyncThunk(
//   "repassword",
//   async ({ email, newPassword }: { email: string; newPassword: string }) => {
//     const axios = await useAxios();
//     try {
//       const response = await axios.post("/api/change-password", {
//         email,
//         newPassword,
//       });
//       return response.data;
//     } catch (error) {
//       throw handleError(error);
//     }
//   }
// );
