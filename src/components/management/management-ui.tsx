"use client";
import Cards from "./card-continer/cards";

const Management = () => {
  return (
    <>
      <h1 className="font-cairo font-bold text-3xl mb-4 mr-6 py-12">
        اختر اي من الإجراءات التالية تريد القيام بها :
      </h1>
      <Cards />
    </>
  );
};

export default Management;
