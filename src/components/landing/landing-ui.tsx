"use client";

import React, { useEffect } from "react";
import Header from "@/components/landing/ui/Header";
import { motion } from "framer-motion";
import Footer from "./ui/footer";
import { steps } from "@/lib/jsons/landing-page";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { advertisements } from "@/lib/fetsures/landing/action";
import ImageCarousel from "./ui/ImageCarousel";
import Link from "next/link";
import Step from "./ui/Step";
import Image from "next/image";
const Landing = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.landing);
  useEffect(() => {
    dispatch(advertisements());
  }, [dispatch]);

  type image = {
    src: string;
    alt: string;
  };
  const imgs: image[] = [
    { src: "/images/Group 284.png", alt: "ملء استمارة التسجيل الإلكترونية." },
    { src: "/images/Group 282.png", alt: "إرفاق المستندات المطلوبة." },
    { src: "/images/Group 278.png", alt: "انتظار التأكيد." },
    { src: "/images/Group 285.png", alt: "استلام الموافقة." },
  ];

  if (error) <div>{error}</div>;

  return (
    <div className="bg-white overflow-x-hidden">
      <Header />

      <ImageCarousel />

      <main>
        <section className="pb-10">
          <div className="bg-gradient-to-bl from-[#FCF5E3] via-[#FCF5E3] to-[#F5C337] p-4 md:p-8 min-h-screen">
            <h2 className="pt-8 md:pt-[50px] mb-6 md:mb-[30px] text-xl md:text-4xl text-[#192845] font-bold text-center">
              ما هو مكتب الإسكان الطلابي والإعاشة؟
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mb-8 p-8 md:px-4 flex flex-col md:flex-row gap-8 md:justify-between items-center"
            >
              <div className="text-[16px] md:text-2xl text-[#192845] mt-2 w-full md:w-3/5 text-center md:text-right leading-10 md:leading-[50px]">
                مكتب الإسكان الطلابي والإعاشة هو الجهة المسؤولة عن توفير بيئة
                سكنية مريحة وآمنة للطلاب داخل جامعة طرابلس. يُعنى المكتب بتنظيم
                عملية إسكان الطلاب وإدارتها، مع تقديم خدمات الإعاشة التي تشمل
                الوجبات اليومية والصيانة المستمرة.
                <br />
                يهدف المكتب إلى تلبية احتياجات الطلاب السكنية وتسهيل حياتهم
                الجامعية، خاصةً للطلاب الذين يأتون من مناطق بعيدة عن الحرم
                الجامعي.
              </div>

              <Image
                // layout="intrinsic"
                width={500}
                height={300}
                src="/images/image.png"
                alt=""
                className="w-full md:w-[550px] h-auto self-center ml-10 md:ml-0"
              />
            </motion.div>
          </div>

          <div className="p-4 md:p-8 min-h-screen flex flex-col items-center justify-center">
            <h2 className="pt-8 md:pt-[50px] mb-6 md:mb-[30px] text-xl md:text-4xl text-[#192845] font-bold text-center">
              لماذا يعتبر الإسكان الجامعي مهماً؟
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="p-8 md:px-4 flex flex-col md:flex-row items-center justify-start gap-4"
            >
              <Image
                // layout="intrinsic"
                width={500}
                height={300}
                src="/images/image2.png"
                alt=""
                className="w-full md:w-[570px] h-auto"
              />

              <p className="text-[16px] md:text-2xl text-[#192845]  w-full md:w-3/5 text-center md:text-center leading-10 md:leading-[50px]">
                الإسكان الجامعي ليس مجرد مكان للإقامة؛ بل هو عامل أساسي في تحقيق
                الاستقرار الأكاديمي والاجتماعي للطلاب. فهو يساهم في توفير بيئة
                مريحة وآمنة تمكنهم من التركيز على دراستهم وبناء علاقات اجتماعية
                قوية. كما يوفر فرصة للتعرف على طلاب من خلفيات مختلفة، مما يعزز
                مهاراتهم الاجتماعية والتواصلية. إلى جانب ذلك، يساعد الإسكان
                الجامعي الطلاب على تنظيم حياتهم اليومية بكفاءة، حيث يوفر لهم
                بيئة مناسبة للعيش والدراسة دون القلق بشأن المواصلات.
              </p>
            </motion.div>
          </div>

          <div className="bg-gradient-to-bl from-[#FCF5E3] via-[#FCF5E3] to-[#F5C337] p-4 md:p-8">
            <h2 className="pr-4 pt-8 md:pt-[50px] mb-6 md:mb-[30px] text-xl md:text-4xl text-[#192845] font-bold text-center ">
              أهم فوائد الإسكان الجامعي
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="mb-8 p-8 md:px-4 flex flex-col md:flex-row gap-8  md:justify-between items-center"
            >
              <ul className="list-none space-y-4 text-[#192845] text-[16px] md:text-2xl leading-relaxed md:leading-10 text-center md:text-right">
                <li>
                  <b>تخفيف عناء التنقل:</b>
                  <p>
                    يتيح للطلاب توفير الوقت والجهد من خلال قربهم من الجامعة.
                  </p>
                </li>
                <li>
                  <b>دعم الاستقلالية:</b>
                  <p>تنظيم حياتهم اليومية في بيئة مسؤولة.</p>
                </li>
                <li>
                  <b>تعزيز التفاعل الاجتماعي:</b>
                  <p>تكوين علاقات وصداقات مع زملاء الدراسة.</p>
                </li>
                <li>
                  <b>بيئة تعليمية داعمة:</b>
                  <p> أجواء تساعد الطلاب على التركيز في الدراسة.</p>
                </li>
                <li>
                  <b>الحفاظ على الأمان:</b>
                  <p>بيئة آمنة تتيح للطلاب وأولياء أمورهم الاطمئنان.</p>
                </li>
              </ul>
              {/* temp */}

              <Image
                // layout="intrinsic"
                height={200}
                width={200}
                src="/images/image3.png"
                alt=""
                className=" md:w-[300px]  w-[175px] "
              />
            </motion.div>
          </div>
        </section>

        <section className="py-6 md:py-10 px-4 sm:px-6 w-full">
          <h2 className="text-center text-xl md:text-4xl font-bold text-[#192845] mb-6">
            كيفية التسجيل
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="mb-8 p-8 md:px-0"
          >
            <div className="pr-2 md:pr-4 pl-4 md:pl-10 mb-6 text-[16px] md:text-2xl text-center md:text-right text-[#192845] leading-10">
              <p className="mb-4">
                يحرص مكتب الإسكان والإعاشة على تسهيل عملية التسجيل للطلاب
                الراغبين في الاستفادة من خدمات السكن الجامعي.
              </p>
              <p>
                <b>اتبع الخطوات التالية للتقديم بسهولة:</b>
              </p>
            </div>

            <div className="flex flex-col my-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  } justify-around items-center gap-8 mt-10`}
                >
                  <Image
                    // layout="intrinsic"
                    src={imgs[index].src}
                    alt={imgs[index].alt}
                    width={250}
                    height={300}
                    className="md:w-[400px] h-auto"
                  />
                  <Step step={step} index={index} />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link href="/housing-request">
                <button className="text-xl md:text-4xl px-6 md:px-8 py-2 md:py-3 my-6 md:mt-16 md:mb-0 bg-[#F5C337] rounded-md hover:bg-[#DBB459] transition duration-300">
                  تقديم طلب إسكان
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Landing;
