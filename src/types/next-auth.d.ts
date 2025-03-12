// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
declare module "next-auth" {
  interface AuthState {
    error: string;
    statues: "idel" | "loading" | "seccuess" | "reject";
    loginParams: {
      access: string;
      refresh: string;
      token_expiration: string;
      token: string;
    };
    checkEmail: string;
    VerifyEmail: {
      message: string;
      token: string;
    };
  }
  interface Session {
    user: AuthUser;
  }

  interface BasicUser {
    id: number;
    FullName: string;
  }

  interface Session {
    user: {
      id: number;
      name: string;
      username: string;
      FullName: string;
      token: string;
      type: string; // التأكد من وجود الخاصية role
    };
  }

  interface User {
    id: number;
    username: string;
    FullName: string;
    access?: string;
    refresh?: string;
    address?: string;
    type?: string;
    token?: string;
    type?: string; // تضمين الخاصية role هنا أيضًا
  }

  // interface User extends BasicUser {
  //   username: string;
  //   FullName?: string;
  //   // phone: string;
  //   // IsAdmin: number;
  //   // IsSuper: number;
  //   // IsActive: number;
  //   // email: string;
  //   // email_verified_at: string;
  //   // created_at: string;
  //   // updated_at: string;
  //   access?: string;
  //   refresh?: string;
  //   error?: string;
  //   address?: string;
  //   type?: string;
  //   token?: string;
  //   role?: string;
  // }

  interface AxiosOptionsProps {
    auth?: boolean;
    formData?: boolean;
    baseURL?: string;
    token?: string;
  }

  interface ForgetPasswordForm {
    step: number;
    username?: string;
    otp_password?: string;
    new_password?: string;
    change_password_token?: string;
  }

  interface StepOne {
    step: 1;
    username: string;
  }

  interface StepTwo {
    step: 2;
    username: string;
    otp_password: string;
  }

  interface StepThree {
    step: 3;
    newPassword: string;
    changePasswordToken: string;
  }

  interface StepOneResponse {
    detail: string;
  }

  interface StepTwoResponse {
    password_change_token: string;
  }

  interface StepThreeResponse {
    detail: string;
  }

  interface ForgetPasswordState {
    detail?: string;
    password_change_token?: string;
  }

  interface PostUser {
    username: string;
    email: string;
    phone: string;
    address: string;
    FullName: string;
    isAdmin: boolean;
    isActive: boolean;
  }
}
