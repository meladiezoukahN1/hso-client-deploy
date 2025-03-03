import React from "react";
import { Cairo } from "next/font/google";

const inter = Cairo({ subsets: ["latin", "arabic"] });

const WrapperAuth = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-[url('/bg-hso.png')]">
    {/* طبقة مع تأثير الضبابية على الخلفية */}
    <div className="absolute inset-0 bg-amber-300 bg-opacity-10 backdrop-blur-md"></div>
  
    {/* المحتوى الرئيسي */}
    <div
      className={`bg-white bg-opacity-70 p-5 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl relative z-10 ${inter.className}`}
    >
        {children}
      </div>
    </div>
  );
};

export default WrapperAuth;
