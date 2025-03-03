"use client";

import React, { useState, ChangeEvent, MouseEvent } from "react";
import Header from "@/components/landing/ui/Header";
import Link from "next/link";
import Footer from "@/components/landing/ui/footer";
import FormDialog from "@/components/ui/GeneralDialog";

const SubmitRequest = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isChecked) {
      event.preventDefault();
      setDialogMessage("يجب الموافقة على جميع الشروط قبل تقديم الطلب.");
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setDialogMessage("");
  };

  return (
    <>
      <Header />
      <div className="bg-red-50 min-h-screen flex flex-col items-center justify-center border-t-4 border-[#DBB459]">
        {/* Container */}
        <div className="w-full bg-gradient-to-bl from-[#356798] via-[#356798] to-[#1A3E61]">
          <span className="flex items-center py-4 px-1 mx-6 font-bold text-white border-b-4 border-[#DBB459] w-fit md:text-2xl">
            تقديم طلب إسكان
          </span>

          <div className="max-auto w-full bg-white shadow-lg p-4 sm:p-10 pr-4 sm:pr-12 ">
            {/* Header */}
            <div className="text-right mb-6 w-full sm:w-3/4 mx-auto">
              <h1 className="text-xl sm:text-3xl font-bold text-[#1A3E61] mb-4 ">
                مرحباً بك في نموذج طلب إسكان جامعي!
              </h1>
              <p className="text-sm  sm:text-xl">
                يسرنا أن نقدم لك خدمة طلب الإسكان لطلاب جامعة طرابلس، يرجى ملء
                النموذج التالي بعناية لأننا نحرص على اختيار الطلبة المستوفين
                للشروط.
              </p>
            </div>

            {/* شروط التقديم */}
            <div className="bg-[#FCF5E3] p-4 sm:p-6 w-full sm:w-3/4 mx-auto justify-center rounded-2xl border-[0.5px] border-black">
              <h2 className="text-base sm:text-xl font-bold mb-4 ">
                الشروط لتقديم الطلبات في صفحة تسجيل الطلبة
              </h2>
              <ul className="list-square list-inside leading-6 sm:leading-7 text-sm sm:text-xl">
                <li className="mt-3">
                  <strong>
                    <b>الشرط الأول : </b>
                  </strong>
                  <br />
                  <ul className="list-disc list-outside mr-8">
                    <li>
                      <span>
                        عدم وجود الكلية المطلوبة في مدينة الطالب
                        <br />
                        يجب أن يكون الطالب من خارج مدينة طرابلس وأن يكون لديه
                        تعريف جامعي، وأن الكلية التي يرغب في الدراسة بها غير
                        متوفرة في مدينته.
                      </span>
                    </li>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>
                    <b>الشرط الثاني:</b>
                  </strong>
                  <br />
                  <ul className="list-disc list-outside mr-8">
                    <li>
                      <span>
                        الالتزام بالحضور
                        <br />
                        يُشترط على الطالب عدم الغياب لفترات طويلة عن السكن
                        الجامعي بعد قبوله.
                      </span>
                    </li>
                  </ul>
                </li>
                <li className="mt-3">
                  <b>
                    {" "}
                    <strong>الشرط الثالث:</strong>
                  </b>
                  <br />
                  <ul className="list-disc list-outside mr-8">
                    <li>
                      <span>
                        مدة الدراسة المحددة
                        <br />
                        يجب أن يُكمل الطالب دراسته ضمن المدة الزمنية المحددة
                        لتلك الكلية.
                      </span>
                    </li>
                  </ul>
                </li>
                <li className="mt-3">
                  <b>
                    {" "}
                    <strong>الشرط الرابع:</strong>
                  </b>{" "}
                  <br />
                  <ul className="list-disc list-outside mr-8">
                    <li>
                      <span>
                        القبول المبدئي والنهائي
                        <br />
                        في حالة قبول الطلب إلكترونيًا، يُعتبر هذا قبولًا
                        مبدئيًا فقط.
                        <br />
                      </span>
                    </li>
                  </ul>
                </li>
                <li className="arrow-marker mt-2">
                  <span className="text-xs sm:text-lg mt-3">
                    <span className="font-bold text-sm sm:text-xl mr-3 ">
                      القبول النهائي:
                    </span>
                    <br />
                    <p className="mr-8">
                      يتطلب الحضور الشخصي في جامعة طرابلس مع تقديم الأوراق
                      المطلوبة.
                    </p>
                  </span>
                </li>
              </ul>
              <p className="text-lg sm:text-xl font-bold text-[#1A3E61] mt-3">
                يُرجى ملاحظة أنه يمكن رفض الطلب بعد المراجعة النهائية للأوراق
                والمستندات.
              </p>
              <div className="p-4 sm:p-6 w-full   justify-center rounded-b-2xl">
                {/* نص تحذيري */}
                <h1 className="text-base sm:text-xl font-bold mb-2 text-[#1A3E61]">
                  ملاحظة هامة
                </h1>
                <p className="text-sm sm:text-xl font-bold">
                  {" "}
                  - يجب على الطالب قراءة جميع الشروط بعناية قبل تقديم الطلب.
                </p>

                <p className="text-sm sm:text-xl font-bold">
                  {" "}
                  - أي مخالفة للشروط قد تؤدي إلى إلغاء القبول في السكن
                  الجامعي.
                </p>
              </div>
            </div>

            <div className="text-right mt-6 w-full sm:w-3/4 mx-auto mb-6 ">
              <label className="flex items-right justify-start pr-2">
                <input
                  type="checkbox"
                  className="mr-2 my-4"
                  onChange={handleCheckboxChange}
                />
                <span className="text-xs sm:text-lg text-[#1A3E61]  p-2 pr-2">
                  {" "}
                  أوافق على جميع الشروط{" "}
                </span>
              </label>
            </div>

            {/* زر التقديم */}
            <div className="text-center">
              <Link href="/housing-request/application-form">
                <button
                  className="bg-gradient-to-bl from-[#356798] via-[#356798] to-[#1A3E61] text-white px-10 sm:px-20 py-2 rounded-md hover:bg-gradient-to-br hover:from-[#356798] hover:via-[#1A3E61] hover:to-[#1A3E61] transition duration-300"
                  onClick={handleButtonClick}
                >
                  تقديم طلب
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <FormDialog
        isOpen={isDialogOpen}
        onOpenChange={handleDialogClose}
        dialogTitle="تحذير"
        description={dialogMessage}
        confirmText="حسناً"
        onConfirm={handleDialogClose}
      />

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default SubmitRequest;
