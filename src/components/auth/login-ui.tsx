"use client";

import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { GiPadlock } from "react-icons/gi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import validatePassword from "@/hooks/validate-password";
import Link from "next/link";
import OTP from "./ui/otp";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { loginAction } from "@/lib/fetsures/auth/action";
import useAuthLock from "@/hooks/useAuthLock";
import Image from "next/image";
import { LoadingLogin } from "../ui/DailogLoading";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loginParams } = useAppSelector((state) => state.auth);
  const { authState, handleFailedAttempt } = useAuthLock();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const isFormValid = username && validatePassword(password);

    if (!isFormValid) {
      toast.error("الرجاء ملء جميع الحقول.");
      handleFailedAttempt();
      return;
    }

    try {
      await dispatch(
        loginAction({
          username,
          password,
        })
      );
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      toast.error("فشل تسجيل الدخول. يرجى المحاولة مرة أخرى!");
      handleFailedAttempt();
    }
  };

  const handleVerify = async (otp: string) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        token: loginParams.token,
        otp,
        redirect: false,
      });

      setIsLoading(false);
      if (res?.ok) {
        router.push("/home");
      } else {
        setIsLoading(false);
        toast.error("تاكد من رمز التحقق");
      }
    } catch {}
  };

  const handleResend = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(
      loginAction({
        username,
        password,
      })
    );
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <div className="w-full md:w-2/3 flex flex-col justify-center items-center bg-white px-10 py-6 order-2 md:order-1">
        <h1 className="text-4xl font-bold text-indigo-900 mb-6">
          مرحبـــــًا بك
        </h1>
        <p className="text-xl text-gray-700 mb-6 text-center">
          من فضلك قم بإدخال اسم المستخدم وكلمة المرور
        </p>
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          {/* حقل اسم المستخدم */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-right font-bold text-gray-700 mb-1"
            >
              اسم المستخدم
            </label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="يحتوي إسم المستخدم على الأحرف الإنجليزية والأرقام"
              required
              className="p-2 rounded-md border border-gray-400 bg-[#F1E4D180] focus:ring-2 focus:ring-indigo-500 w-full"
            />
          </div>

          {/* حقل كلمة المرور */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-right font-bold text-gray-700 mb-1"
            >
              كلمة المرور
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ادخل كلمة المرور الخاصة بك"
              required
              className={`p-2 rounded-md border border-gray-400 bg-[#F1E4D180] focus:ring-2 ${
                !validatePassword(password) && password
                  ? "ring-red-500 border-red-600"
                  : "ring-indigo-500 border-indigo-500"
              } w-full`}
            />
            <Link
              href="/auth/VerifiedEmail"
              className="text-sm text-blue-900 hover:underline flex items-center text-right mt-2 self-start"
            >
              هل نسيت كلمة المرور؟
              <GiPadlock className="w-5 h-5 ml-1" />
            </Link>
          </div>

          {/* زر تسجيل الدخول */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={authState.isLocked}
              className={`w-1/2 py-2 rounded-md font-bold text-[#1A3D61] transition-all duration-300 shadow-md ${
                authState.isLocked
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#F5C337] hover:bg-[#D99B4E]"
              }`}
            >
              {authState.isLocked ? "محظور مؤقتًا" : "تسجيل الدخول"}
            </button>
          </div>
        </form>

        {/* عرض نافذة OTP في حال نجاح الخطوة الأولى */}
        {loginParams.token && (
          <OTP
            length={6}
            title="تفقد بريدك الإلكتروني لقد تم إرسال رمز التحقق إليك قم بإدخاله"
            subtitle="أرسلنا الرمز للبريد الإلكتروني"
            email=""
            onVerify={handleVerify}
            onResend={handleResend}
            verifyButtonText="تأكيد"
            resendButtonText="أعد الإرسال"
          />
        )}
      </div>
      {isLoading && <LoadingLogin />}
      {/* القسم الأيمن - الشعار */}
      <div className="w-full md:w-1/3 flex justify-center items-center bg-gradient-to-b md:bg-gradient-to-t from-yellow-500 to-white-200 shadow-2xl rounded-lg py-2 order-1 md:order-2">
        <Image
          src="/images/logo-hso.png"
          alt="Logo"
          width={300}
          height={300}
          className="w-40 sm:w-60 md:w-80"
        />
      </div>
    </div>
  );
};

export default LoginPage;
