import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Carousel as Carousels } from "flowbite-react";
import { useAppSelector } from "@/hooks/redux-toolkit";

const ImageCarousel = () => {
  const { advertisement } = useAppSelector((state) => state.landing);

  const images = [
    {
      src: "/images/img01.png",
      title: "الإسكان الجامعي:",
      subtitle: "مكانك الأول للراحة والاستقرار",
    },
    ...advertisement.map((ad) => ({
      src: ad.image,
      title: ad.title,
      subtitle: ad.details,
    })),
    {
      src: "/images/teambg.jpg",
      title: "",
      logo: "/Group.png",
      description: "نحو مستقبل رقمي مبتكر ومستدام",
      buttonText: "اضغط لمعرفة المزيد عن الفريق",
    },
  ];

  return (
    <div
      className="w-full border-t-4 border-[#DBB459] border-b-2 border-b-[#00007F]"
      dir="ltr"
    >
      <Carousels
        slideInterval={6000}
        theme={{
          root: {
            base: "h-[300px] sm:h-[400px] md:h-[500px] lg:h-[610px] rounded-none",
          },
           control:{
            base: "rounded-none"
           }
        }}
        className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[610px] rounded-none"
      >
        {images.map((item, index) => (
          <div className="relative w-full h-full" key={index}>
            <Image
              src={
                item.src === "/images/teambg.jpg" ||
                item.src === "/images/img01.png"
                  ? item.src
                  : `${process.env.NEXT_PUBLIC_API_URL}/${item.src}`
              }
              alt={`Slide ${index + 1}`}
              width={1920} // تحديد العرض يدويًا
              height={1080} // تحديد الارتفاع يدويًا
              // priority={index === 0}
              className="w-full h-full object-cover"
            />

            <div
              className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 lg:px-12"
              dir="rtl"
            >
              {item.title && (
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-2 md:mb-4 mr-4 md:mr-8 text-shadow">
                  {item.title}
                </h1>
              )}

              {item.subtitle && (
                <p className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold text-white mr-4 md:mr-8 text-shadow">
                  {item.subtitle}
                </p>
              )}

              {item.logo && (
                <div className="flex items-center justify-center mt-4 md:mt-8">
                  <Image
                    src={item.logo}
                    alt="شعار الفريق"
                    width={150} // ضبط الحجم يدويًا
                    height={150}
                    className="w-24 sm:w-32 md:w-40 lg:w-48"
                  />
                </div>
              )}

              {item.description && (
                <p className="text-sm sm:text-base md:text-xl lg:text-3xl font-bold text-[#FFC625] text-center mt-2 md:mt-4">
                  {item.description}
                </p>
              )}

              {item.buttonText && (
                <div className="flex justify-center mt-4 md:mt-8">
                  <Link href="/about_team">
                    <button
                      className="bg-[#E5B11F] text-white font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300
                      px-3 py-2 text-sm
                      sm:px-4 sm:py-2 sm:text-base
                      md:px-6 md:py-3 md:text-lg
                      lg:px-8 lg:py-4 lg:text-xl"
                    >
                      {item.buttonText}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </Carousels>
    </div>
  );
};

export default ImageCarousel;
