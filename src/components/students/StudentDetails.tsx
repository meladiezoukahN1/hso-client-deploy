"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import GeneralTable from "../ui/GeneralTable";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { ActiveStudent, Student } from "@/lib/fetsures/students/action";
import { LoadingIcon } from "../ui";

const StudentInfoCard = () => {
  const dispatch = useAppDispatch();
  const { studentDetails, loading } = useAppSelector((state) => state.student);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch(Student(parseInt(Array.isArray(id) ? id[0] : id)));
  }, [dispatch, id]);

  if (loading) return <LoadingIcon />;

  if (!studentDetails)
    return (
      <div className="w-full text-center min-h-screen flex items-center justify-center">
        لم يتم العثور على تفاصيل الطالب
      </div>
    );

  const handleActiveStudent = async () => {
    await dispatch(
      ActiveStudent({
        id: studentDetails.fileNo,
        active: studentDetails.status,
      })
    ).unwrap();
    await dispatch(Student(studentDetails.fileNo));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mt-5 p-6">
      <h1 className="text-2xl font-bold text-[#1A3D61] mb-6 text-center">
        بيانات الطالب
      </h1>

      <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-4">
          {[
            {
              label: "الاسم الثلاثي",
              value: `${studentDetails.firstname} ${studentDetails.lastname} ${studentDetails.midname}`,
            },
            { label: "الرقم الوطني", value: studentDetails.national_number },
            { label: "تاريخ الميلاد", value: studentDetails.DOB },
            { label: "رقم الهاتف", value: studentDetails.phone },
            { label: "الايميل", value: studentDetails.email },
          ].map(({ label, value }) => (
            <div key={label} className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                {label}
              </label>
              <input
                type="text"
                readOnly
                value={value}
                className="w-full p-2 rounded-md bg-gray-200 text-gray-700 text-sm border-0 focus:outline-none focus:ring-0"
                disabled
              />
            </div>
          ))}
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          {[
            { label: "رقم الملف", value: studentDetails.fileNo },
            { label: "رقم القيد", value: studentDetails.studentID },
            { label: "الكلية", value: studentDetails.faculty_name	 },
            {
              label: "الجنسية",
              value:
                studentDetails.nationality === "Foreign" ? "أجنبي" : "ليبي",
            },
            { label: "المدينة", value: studentDetails.city },
          ].map(({ label, value }) => (
            <div key={label} className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                {label}
              </label>
              <input
                type="text"
                readOnly
                value={value}
                className="w-full p-2 rounded-md bg-gray-200 text-gray-700 text-sm border-0 focus:outline-none focus:ring-0"
                disabled
              />
            </div>
          ))}
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          {[
            { label: "العمارة", value: studentDetails.building },
            { label: "الدور", value: studentDetails.Floor },
            { label: "الحجرة", value: studentDetails.room },
          ].map(({ label, value }) => (
            <div key={label} className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                {label}
              </label>
              <input
                type="text"
                readOnly
                value={value}
                className="w-full p-2 rounded-md bg-gray-200 text-gray-700 text-sm border-0 focus:outline-none focus:ring-0"
                disabled
              />
            </div>
          ))}

          {[
            { label: "الملفات", link: studentDetails.documents },
            { label: "البطاقة", link: studentDetails.fileNo },
          ].map(({ label, link }) => (
            <div key={label} className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                {label}
              </label>
              <Link
                href={`${process.env.NEXT_PUBLIC_API_URL}/${link}`}
                target="_blank"
              >
                <button className="w-full justify-center flex items-center p-2 border border-gray-300 rounded-md bg-blue-900 hover:bg-blue-800 text-gray-100 text-sm transition-colors mt-3 h-9">
                  <span>عرض {label}</span>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center pb-4 gap-4 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <h2 className="text-sm md:text-xl font-bold text-gray-800">
            الفصول الدراسية
          </h2>
          <span
            className={`px-3 py-1 text-sm md:text-base md:px-4 md:py-2 rounded text-white ${
              studentDetails.status === "Active" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {studentDetails.status === "Active"
              ? "قيد الدراسة"
              : "متوقف عن الدراسة"}
          </span>
        </div>

        <button
          onClick={handleActiveStudent}
          className={`text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2 ${
            studentDetails.status === "Active" ? "bg-red-700" : "bg-green-400"
          } rounded text-white w-fit`}
        >
          {studentDetails.status === "Active"
            ? "إلغاء تفعيل الطالب"
            : "تفعيل الطالب"}
        </button>
      </div>

      <div className="rounded-lg max-h-80 overflow-auto">
        <GeneralTable
          columns={[
            { header: "الفصل", accessor: "name" },
            { header: "بداية الفصل", accessor: "startDate" },
            { header: "نهاية الفصل", accessor: "endDate" },
            { header: "تاريخ الفصل", accessor: "date" },
          ]}
          data={studentDetails.AcademicSeason}
          classNameTH="bg-gray-200 p-3 font-semibold"
        />
      </div>
    </div>
  );
};

export default StudentInfoCard;
