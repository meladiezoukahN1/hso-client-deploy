"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const about_team = () => {
    const image = {
        src: "/teambg.jpg",
        logo: "/Group.png",
    };

    return (
        <div className="w-full flex justify-center items-center ">
            <Card className="relative w-full ">
                <CardContent className="flex items-center justify-center p-0">
                    <div className="relative w-full h-full ">
                        {/* الصورة */}
                        <Image
                            src={image.src}
                            className="w-full h-full object-cover rounded-lg "
                            alt=""
                            fill
                        />

                        {/* Overlay النصوص فوق الصورة */}
                        <div
                            className="absolute inset-0 rounded-lg flex flex-col justify-center
                             items-center px-6 z-10 mb-5 "
                            dir="rtl"   
                        >
                            <div className="flex items-center justify-center mb-4  ">
                                <Image
                                    src={image.logo}
                                    alt="شعار الفريق"
                                    className="flex items-center justify-center "
                                    fill
                                />
                            </div>
                            <div className="text-white text-xl  " dir="rtl">
                                <h1 className="text-2xl mb-4 font-bold text-white border-b-2 border-t-2 border-[#FFC625] p-6">
                                    فريق التحول الرقمي - جامعة طرابلس
                                </h1>
                                <p className="mb-4  text-white text-xl text-justify-rtl leading-9">
                                    يُعد فريق التحول الرقمي بجامعة طرابلس حجر الزاوية في دفع عجلة التطور التكنولوجي داخل الجامعة، حيث يسعى إلى تبني أحدث الحلول الرقمية لتطوير البنية التحتية التقنية وتحسين الأداء الأكاديمي والإداري. يهدف الفريق إلى تحويل العمليات التقليدية إلى أنظمة رقمية متكاملة تساهم في تعزيز تجربة الطلاب والأساتذة، وتبسيط الإجراءات الإدارية، وتطوير بيئة تعليمية متقدمة تدعم الابتكار والاستدامة.
                                    <br />
                                    يعمل فريق التحول الرقمي على:

                                </p>

                                <ul className="list-disc text-white text-xl space-y-2 marker:text-yellow-500 pr-10">
                                    <li className="text-white text-xl">
                                        تطوير الأنظمة الإلكترونية: تحويل العمليات الورقية إلى أنظمة إلكترونية تتيح سهولة الوصول إلى المعلومات واتخاذ القرارات بسرعة ودقة.
                                    </li>
                                    <li className="text-white text-xl">
                                        تطبيق أحدث التقنيات: استخدام الأدوات والحلول التقنية الحديثة لتعزيز كفاءة الخدمات التعليمية والإدارية.
                                    </li>
                                    <li className="text-white text-xl">
                                        تحسين تجربة الطلاب: تقديم منصات وخدمات رقمية مبتكرة تُسهّل التواصل، وتُسهم في تحسين الأداء الأكاديمي وتوفير بيئة تعليمية متطورة.
                                    </li>
                                    <li className="text-white text-xl">
                                        دعم الابتكار: تشجيع تبني التكنولوجيا والابتكار في جميع مجالات الجامعة، بما يعزز من دور الجامعة كمؤسسة رائدة في مجال التعليم الرقمي.
                                    </li>
                                </ul>

                            </div>

                            <Link href="/Digital_Trans_Team/about_team/our_team">
                                <button
                                    className="px-8 py-2 mt-10 bg-[#E5B11F]
                                     text-white font-bold rounded-lg hover:bg-yellow-500
                                      focus:outline-none sm:px-10 sm:py-4"
                                    aria-label="معرفة المزيد"
                                >
                                    تعرف على أعضاء الفريق
                                </button>
                            </Link>

                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default about_team;