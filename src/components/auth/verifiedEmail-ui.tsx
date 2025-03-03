"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OTP from "./ui/otp";
import validateEmail from "@/hooks/validate-email";
import { useAppDispatch } from "@/hooks/redux-toolkit";
import { checkEmialAction, verifyOPT } from "@/lib/fetsures/auth/action";
import useAuthLock from "@/hooks/useAuthLock";
import Image from "next/image";

const VerifiedEmail = () => {
  const [email, setEmail] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { authState, handleFailedAttempt } = useAuthLock();
  const router = useRouter();

  const handleSendClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (authState.isLocked) {
      toast.error("تم حظرك مؤقتا الرجاء المحاولة في وقت لاحق");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("الرجاء إدخال البريد الإلكتروني.");
      return;
    }
    try {
      await dispatch(checkEmialAction(email)).unwrap();
      toast.success("تم إرسال رمز التحقق إلى بريدك الإلكتروني.");
      // فتح النافذة المنبثقة لإدخال OTP بعد نجاح الإرسال
      setIsPopupOpen(true);
    } catch {
      handleFailedAttempt();
      toast.error("قم بالتاكد من الايميل الخاص بك");
    }
  };

  const handleResend = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (authState.isLocked) {
      toast.error("تم حظرك مؤقتا الرجاء المحاولة في وقت لاحق");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("الرجاء إدخال البريد الإلكتروني.");
      return;
    }
    try {
      await dispatch(checkEmialAction(email)).unwrap();
      toast.success("تم إرسال رمز التحقق إلى بريدك الإلكتروني.");
    } catch {
      handleFailedAttempt();
      toast.error("قم بالتاكد من الايميل الخاص بك");
    }
  };

  const handleVerify = async (otp: string) => {
    if (authState.isLocked) {
      toast.error("تم حظرك مؤقتا الرجاء المحاولة في وقت لاحق");
      return;
    }
    try {
      await dispatch(verifyOPT({ email, otp })).unwrap();
      router.push(`/auth/repassword?email=${email}&isLogin=true`);
    } catch {
      handleFailedAttempt();
      toast.error("الرجاء التاكد من رقم OTP الخاص بك");
    }
  };

  return (
    <div className="flex h-screen flex-col md:flex-row ">
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
            قم بإدخال البريد الإلكتروني لإستعادة <br /> كلمة المرور الخاصة بك
          </h1>
        </div>
        <form className="w-full max-w-md space-y-6">
          {/* حقل البريد الإلكتروني */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-md font-bold text-gray-700 mb-1 text-right"
            >
              البريد الإلكتروني
            </label>
            <Input
              type="email"
              id="email"
              placeholder="قم بإدخال بريدك الإلكتروني"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border-amber-900 shadow-sm focus:ring-blue-500 focus:border-black sm:text-sm placeholder-amber-900 bg-[#F1E4D180]"
            />
          </div>
          {/* زر الإرسال */}
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSendClick}
              className="h-10 w-1/2 bg-[#F5C337] text-[#1A3D61] text-lg font-bold rounded-md hover:bg-[#ebb92f] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ease-in-out shadow-lg"
            >
              إرســـال
            </button>
          </div>
          {/* رابط الرجوع */}
          <div className="flex items-center justify-center">
            <Link
              href="/auth/login"
              className="text-[#1A3D61] hover:underline font-bold mt-4 text-sm"
            >
              الرجوع إلى واجهة تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>

      {isPopupOpen && (
        <OTP
          length={6}
          title="تفقد بريدك الإلكتروني لقد تم إرسال رمز التحقق إليك قم بإدخاله"
          subtitle="أرسلنا الرمز للبريد الإلكتروني"
          onVerify={handleVerify}
          onResend={handleResend}
          verifyButtonText="تأكيد"
          resendButtonText="أعد الإرسال"
        />
      )}
    </div>
  );
};

export default VerifiedEmail;
