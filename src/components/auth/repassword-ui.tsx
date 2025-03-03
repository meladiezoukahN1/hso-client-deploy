"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import validateEmail from "@/hooks/validate-email";
import { toast } from "sonner";
import validatePassword from "@/hooks/validate-password";
import axios from "axios";
import Image from "next/image";
import { useAppSelector } from "@/hooks/redux-toolkit";

const Repassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const isLogin = searchParams.get("isLogin");
  const [isReady, setIsReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { VerifyEmail } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!email || !isLogin || !validateEmail(email) || isLogin !== "true") {
      router.push("/auth/VerifiedEmail");
      return;
    }
    setIsReady(true);
  }, [email, isLogin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error("كلمة المرور يجب أن تحتوي على 8 أحرف وأرقام على الأقل");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/forgetPassword`,
        { email, newPassword: password, token: VerifyEmail.token },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${VerifyEmail.token}`,
          },
        }
      );

      toast.success("تم تحديث كلمة المرور بنجاح");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch {
      toast.error("حدث خطأ غير متوقع، حاول مرة أخرى");
    }
  };

  if (!isReady) return null;

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/3 flex justify-center items-center md:bg-gradient-to-t bg-gradient-to-b from-yellow-500 to-white-200 md:shadow-2xl rounded-lg">
        <Image
          src="/images/logo-hso.png"
          alt="Logo"
          width={300}
          height={300}
          className="w-60 sm:w-80 md:w-96"
        />
      </div>
      <div className="w-full md:w-2/3 flex flex-col justify-center items-center px-6">
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-900">
            إعادة تعيين كلمة المرور
          </h1>
          <p className="mt-2 text-md sm:text-xl md:text-2xl text-gray-600">
            الرجاء إدخال كلمة المرور الجديدة
          </p>
        </div>
        <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-md font-bold text-gray-700 mb-1 text-right">
              كلمة المرور الجديدة
            </label>
            <Input
              type="password"
              placeholder="أدخل كلمة المرور الجديدة"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border-amber-900 shadow-sm focus:ring-blue-500 focus:border-black sm:text-sm placeholder-amber-900 bg-[#F1E4D180]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-md font-bold text-gray-700 mb-1 text-right">
              تأكيد كلمة المرور
            </label>
            <Input
              type="password"
              placeholder="أدخل كلمة المرور مرة أخرى"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-lg border-amber-900 shadow-sm focus:ring-blue-500 focus:border-black sm:text-sm placeholder-amber-900 bg-[#F1E4D180]"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="h-10 md:w-1/2 w-4/5 bg-[#F5C337] text-[#1A3D61] text-sm font-bold rounded-md hover:bg-[#ebb92f] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ease-in-out shadow-lg"
            >
              إعادة تعيين كلمة المرور
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Repassword;
