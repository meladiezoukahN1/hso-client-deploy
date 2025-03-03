import React, { useState } from "react";

interface OTPProps {
  length?: number; // عدد خانات OTP (افتراضي 6)
  title?: string; // العنوان الرئيسي
  subtitle?: string; // النص الفرعي
  email?: string; // البريد الإلكتروني (اختياري)
  onVerify: (otp: string) => void; // دالة التأكيد
  onResend: (e: React.MouseEvent<HTMLElement>) => void; // دالة إعادة الإرسال
  verifyButtonText?: string; // نص زر التأكيد
  resendButtonText?: string; // نص زر إعادة الإرسال
}

const OTP: React.FC<OTPProps> = ({
  length = 6,
  title = "تفقد بريدك الإلكتروني لقد تم إرسال رمز التحقق إليك قم بإدخاله",
  subtitle = "أرسلنا الرمز للبريد الإلكتروني",
  onVerify,
  onResend,
  verifyButtonText = "تأكيد",
  resendButtonText = "أعد الإرسال",
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = () => {
    onVerify(otp.join(""));
  };

  const handleResendOtp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onResend(e);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl md:text-2xl font-bold text-center text-blue-800 mb-4">
          {title}
        </h2>
        {/* حقول إدخال OTP بترتيب من اليمين إلى اليسار */}
        <div className="flex flex-row-reverse justify-center mb-4 mt-8 gap-4">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-medium rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#efefef]"
            />
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-[#3c2493] font-semibold">
          {subtitle}
        </div>
        {/* زر التأكيد */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleVerifyOtp}
            className="h-10 w-3/4 md:w-1/2 bg-[#F5C337] text-[#1A3D61] font-bold rounded-md hover:bg-[#ebb92f] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ease-in-out shadow-lg"
          >
            {verifyButtonText}
          </button>
        </div>
        {/* زر إعادة الإرسال */}
        <div className="mt-6 text-center text-xs text-[#3c2493] font-semibold">
          لم تقم بإرسال رمز التحقق؟{" "}
          <button
            onClick={handleResendOtp}
            className="text-[#8B7434] hover:underline"
          >
            {resendButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
