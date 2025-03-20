"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutTeam = () => {
  const image = {
    src: "/images/teambg.jpg",
    logo: "/images/Group.png",
  };

  return (
    <div className="relative w-full h-screen overflow-auto">
      <Image src={image.src} alt="خلفية الفريق" fill className="object-cover" />

      <div
        className="absolute inset-0 flex flex-col overflow-auto justify-center items-center px-4 sm:px-6 md:px-8 z-10 bg-black/40"
        dir="rtl"
      >
        <div className="flex items-center justify-center mb-4 w-4/5 mt-10 md:mt-0 md:w-1/3">
          <Image
            src={image.logo}
            alt="شعار الفريق"
            width={300}
            height={200}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="text-white text-center">
          <h1 className="text-base sm:text-2xl md:text-3xl lg:text-4xl mb-4 font-bold border-y-2 border-[#FFC625] p-4">
            فريق التحول الرقمي - جامعة طرابلس
          </h1>
          <p className="mb-4 text-sm sm:text-sm md:text-lg lg:text-xl leading-relaxed text-justify">
            يُعد فريق التحول الرقمي بجامعة طرابلس حجر الزاوية في دفع عجلة التطور
            التكنولوجي داخل الجامعة، حيث يسعى إلى تبني أحدث الحلول الرقمية
            لتطوير البنية التحتية التقنية وتحسين الأداء الأكاديمي والإداري. يهدف
            الفريق إلى تحويل العمليات التقليدية إلى أنظمة رقمية متكاملة تساهم في
            تعزيز تجربة الطلاب والأساتذة، وتبسيط الإجراءات الإدارية، وتطوير بيئة
            تعليمية متقدمة تدعم الابتكار والاستدامة.
            <br />
            يعمل فريق التحول الرقمي على:
          </p>
          <ul className="list-disc text-xs sm:text-base md:text-lg lg:text-xl space-y-2 marker:text-yellow-500 pr-6 md:pr-10 text-right">
            <li>
              تطوير الأنظمة الإلكترونية: تحويل العمليات الورقية إلى أنظمة
              إلكترونية تتيح سهولة الوصول إلى المعلومات واتخاذ القرارات بسرعة
              ودقة.
            </li>
            <li>
              تطبيق أحدث التقنيات: استخدام الأدوات والحلول التقنية الحديثة
              لتعزيز كفاءة الخدمات التعليمية والإدارية.
            </li>
            <li>
              تحسين تجربة الطلاب: تقديم منصات وخدمات رقمية مبتكرة تُسهّل
              التواصل، وتُسهم في تحسين الأداء الأكاديمي وتوفير بيئة تعليمية
              متطورة.
            </li>
            <li>
              دعم الابتكار: تشجيع تبني التكنولوجيا والابتكار في جميع مجالات
              الجامعة، بما يعزز من دور الجامعة كمؤسسة رائدة في مجال التعليم
              الرقمي.
            </li>
          </ul>
        </div>
        <Link href="/about_team/our_team">
          <button
            className="px-4 py-1 mt-4 text-sm md:text-lg bg-[#E5B11F] text-white font-bold rounded-lg hover:bg-yellow-500 focus:outline-none sm:px-8 mb-5 md:mb-0 sm:py-2 md:px-7 md:py-3"
            aria-label="معرفة المزيد"
          >
            تعرف على أعضاء الفريق
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutTeam;
