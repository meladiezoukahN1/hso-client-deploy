import React from "react";

const StudentCard = ({ label, value }: { label: string; value: string | React.ReactNode }) => {
  return (
    <div className="flex my-5 mx-1 w-full pl-2 items-center">
      <label
        htmlFor=""
        className=" flex items-center font-bold text-base w-40"
      >
        {label}:
      </label>
      <span className="text-base">{value}</span>
    </div>
  );
};

export default StudentCard;
