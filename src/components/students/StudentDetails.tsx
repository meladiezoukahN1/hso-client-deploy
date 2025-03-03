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
    const singleId = Array.isArray(id) ? id[0] : id;
    dispatch(Student(parseInt(singleId)));
  }, [dispatch, id]);

  if (loading) return <LoadingIcon />;

  if (!studentDetails)
    return (
      <div className="w-full text-center min-h-screen flex items-center justify-center">
        لم يتم العثور على تفاصيل الطالب
      </div>
    );

  // const academicData = Array.isArray(studentDetails.AcademicSeason)
  //   ? studentDetails.AcademicSeason.map((s, i) => ({ index: i + 1, ...s }))
  //   : [];

  const activeStudent = async () => {
    await dispatch(
      ActiveStudent({
        id: studentDetails.fileNo,
        active: studentDetails.status,
      })
    ).unwrap();
    await dispatch(Student(studentDetails.fileNo));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mt-5">
      <h1 className="text-2xl font-bold text-[#1A3D61] mb-6 pb-4 mr-[475px]">
        بيانات الطالب
      </h1>

      <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              الاسم الثلاثي{" "}
            </label>
            <input
              type="text"
              readOnly
              value={
                studentDetails.firstname +
                " " +
                studentDetails.lastname +
                " " +
                studentDetails.midname
              }
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              الرقم الوطني
            </label>
            <input
              type="text"
              readOnly
              value={studentDetails.national_number}
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              تاريخ الميلاد
            </label>
            <input
              type="text"
              readOnly
              value={studentDetails.DOB}
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              رقم الهاتف
            </label>
            <input
              type="text"
              readOnly
              value={studentDetails.phone}
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              الايميل
            </label>
            <input
              type="text"
              readOnly
              value={studentDetails.email}
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>
        </div>

        {/* العمود الثاني */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              رقم الملف
            </label>
            <input
              type="text"
              readOnly
              value={studentDetails.fileNo}
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              رقم القيد
            </label>
            <input
              type="text"
              readOnly
              value={studentDetails.studentID}
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              الكلية
            </label>
            <input
              type="text"
              readOnly
              value={studentDetails.passport}
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              الجنسية
            </label>
            <input
              type="text"
              readOnly
              value={
                studentDetails.nationality === "Foreign" ? "أجنبي" : "ليبي"
              }
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              المدينة
            </label>
            <input
              type="text"
              readOnly
              value={studentDetails.city}
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>
        </div>

        {/* العمود الثالث */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              العمارة
            </label>
            <input
              type="text"
              readOnly
              value={studentDetails.building}
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              الدور
            </label>
            <input
              type="text"
              readOnly
              value={studentDetails.Floor}
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              الحجرة
            </label>
            <input
              type="text"
              readOnly
              value={studentDetails.room}
              className="w-full p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-0 text-gray-700 text-sm border-0"
              disabled
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              الملفات
            </label>
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}/${studentDetails.documents}`}
              target="_blank"
            >
              <button className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-md  bg-blue-900 hover:bg-blue-800 text-gray-100 text-sm transition-colors mt-3 h-9">
                <span>عرض الملفات</span>
              </button>
            </Link>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              البطاقة
            </label>
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}/${studentDetails.fileNo}`}
              target="_blank"
            >
              <button className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-md bg-blue-900 hover:bg-blue-800 text-gray-100 text-sm transition-colors mt-3 h-9">
                <span className="">عرض البطاقة</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">الفصول الدراسية</h2>

          <span
            className={`px-4 py-2 rounded text-white ${
              studentDetails.status === "Active" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {studentDetails.status === "Active"
              ? "قيد الدراسة"
              : "متوقف عن الدراسة"}
          </span>
        </div>

        <button
          className={`${
            studentDetails.status === "Active" ? "bg-red-700" : "bg-green-400"
          } rounded px-4 py-2 text-white`}
          onClick={activeStudent}
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
          classNameTH="bg-gray-200 p-3  font-semibold"
        />
      </div>
    </div>
  );
};

export default StudentInfoCard;
