import React from "react";

const DailogLoading = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white py-2 px-8 rounded-lg shadow-lg flex items-center gap-2 justify-center">
        <span className="text-xl font-semibold text-primary-500">تحميل</span>
        <div className="animate-spin inline-block w-5 h-5 border-[3px] border-t-transparent border-primary-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default DailogLoading;
