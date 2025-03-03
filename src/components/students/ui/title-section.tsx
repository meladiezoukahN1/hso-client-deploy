"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { ActiveStudent, Student } from "@/lib/fetsures/students/action";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  title: string;
  className?: string;
  active?: string;
}

const TitleSection = ({ title, className, active }: Props) => {
  const dispatch = useAppDispatch();
  const { studentDetails, loading } = useAppSelector((state) => state.student);
  const handleActive = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await dispatch(
      ActiveStudent({
        id: studentDetails.fileNo,
        active: studentDetails.status,
      })
    );
    await dispatch(Student(studentDetails.fileNo));
    if (!loading) {
      toast.success(
        `تم ${active === "Active" ? "الغاء تفعيل" : "تفعيل"} الطالب`
      );
    }
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div className={`${className ? className : "pr-4"} flex justify-between `}>
      <h1 className="font-cairo font-bold text-2xl my-2 h-full mr-6">
        {title}
        {active === "Inactive" || active === "Active" ? (
          <span
            className={`text-xs mr-2 px-1 py-1 rounded-lg items-center text-white ${
              active === "Active" ? "bg-primary" : "bg-danger"
            }`}
          >
            {active === "Active" ? "قيد الدراسة" : "متوقف عن الدراسة"}
          </span>
        ) : (
          ""
        )}
      </h1>
      {active === "Inactive" || active === "Active" ? (
        <div
          className={`ml-14 w-44 text-center items-center leading-8 text-white px-1 h-8 cursor-pointer rounded-md my-auto ${
            active === "Active" ? "bg-danger" : "bg-secondary"
          }`}
          onClick={handleActive}
        >
          {active === "Active" ? "إالغاء التفعيل" : "تفعيل"}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TitleSection;
