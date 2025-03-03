"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "./input-validate";
import { AddBuildingType } from "@/validation/managements/building";
import React from "react";

interface EditableFieldProps {
  register: UseFormRegister<AddBuildingType>;
  errors: FieldErrors<AddBuildingType>;
  children: React.ReactNode;
}

export default function AddBuildingField({
  register,
  errors,
  children,
}: EditableFieldProps) {
  return (
    <div className="flex relative">
      <div className="space-y-3 flex-1 pr-6">
        <FormField
          type="text"
          label="اسم المبنى"
          name="Buildingname"
          register={register}
          error={errors.Buildingname}
          placeholder="أدخل الاسم الثلاثي"
          className={` h-9`}
        />
        <FormField
          type="text"
          label="عدد الطوابق"
          name="Numberfloors"
          register={register}
          error={errors.Numberfloors}
          className={` h-9`}
        />

        <FormField
          type="text"
          label="الغرف المسكونة"
          name="Numberrooms"
          register={register}
          error={errors.Numberrooms}
          className={` h-9`}
        />
      </div>
      <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 bg-gray-300"></div>

      <div className="space-y-3 flex-1 pl-6">
        <FormField
          type="text"
          label="الغرف المسكونة"
          name="Numberrooms"
          register={register}
          error={errors.Numberrooms}
          className={` h-9`}
        />
        {children}
      </div>
    </div>
  );
}
