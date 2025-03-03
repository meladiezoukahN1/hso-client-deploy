import { createSlice } from "@reduxjs/toolkit";
import { loginAction, checkEmialAction, verifyOPT } from "./action";
import { AuthState } from "next-auth";
import { toast } from "sonner";

const initialState: AuthState = {
  error: "",
  statues: "idel",
  loginParams: {
    access: "",
    refresh: "",
    token_expiration: "",
    token: "",
  },
  checkEmail: "",
  VerifyEmail: {
    message: "",
    token: "",
  },
};
const AuthReducer = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (buillder) => {
    buillder
      .addCase(loginAction.pending, (state) => {
        state.statues = "loading";
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.statues = "seccuess";
        state.loginParams = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.statues = "reject";
        state.error = `${action.error.message}`;
        toast.error(state.error);
      })
      .addCase(checkEmialAction.pending, (state) => {
        state.statues = "loading";
      })
      .addCase(checkEmialAction.fulfilled, (state, action) => {
        state.statues = "seccuess";
        state.checkEmail = action.payload?.message || "حدث خطأ غير معروف";
      })
      .addCase(checkEmialAction.rejected, (state, action) => {
        state.statues = "reject";
        state.error = `${action.error.message}`;
      })

      .addCase(verifyOPT.pending, () => {})
      .addCase(verifyOPT.fulfilled, (state, action) => {
        state.VerifyEmail = action.payload;
      })
      .addCase(verifyOPT.rejected, (state, action) => {
        state.error = `${action.error.message}`;
      });

    // .addCase(Repassword.pending, () => {})
    // .addCase(Repassword.fulfilled, (state, action) => {
    //   state.statues = "seccuess";
    // })
    // .addCase(Repassword.rejected, (state, action) => {
    //   state.error = `${action.error.message}`;
    //   toast.error(state.error);
    // });
  },
});

export default AuthReducer.reducer;
