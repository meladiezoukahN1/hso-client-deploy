import axios from "axios";
import { getSession } from "next-auth/react";
import { AxiosOptionsProps } from "next-auth";
import { autoSignOut } from "./auto-signout";

const url = process.env.NEXT_PUBLIC_API_URL;

const useAxios = async (
  options: AxiosOptionsProps = {
    auth: false,
    formData: false,
    baseURL: url,
  }
) => {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (options.auth) {
    const session = await getSession();
    const token = session?.user?.token;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // في حالة استخدام FormData
  if (options.formData) {
    headers["Content-Type"] = "multipart/form-data";
  }

  const axiosInstance = axios.create({
    baseURL: options.baseURL || url,
    headers: headers,
  });

  // التعامل مع الأخطاء
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && [401, 403, 405].includes(error.response.status)) {
        autoSignOut(); // تسجيل الخروج تلقائيًا في حالة الخطأ
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
