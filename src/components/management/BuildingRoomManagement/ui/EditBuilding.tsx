"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "./input-validate";
import { BuildingShowType } from "@/validation/managements/building";
import React from "react";
import Link from "next/link";

interface EditableFieldProps {
  register: UseFormRegister<BuildingShowType>;
  errors: FieldErrors<BuildingShowType>;
  disabled: boolean;
  children: React.ReactNode;
}

export default function EditableField({
  register,
  errors,
  disabled,
  children,
}: EditableFieldProps) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col gap-3 justify-center items-center">
        <FormField
          type="text"
          label="اسم المبنى"
          name="name_building"
          register={register}
          error={errors.name_building}
          placeholder="أدخل الاسم الثلاثي"
          className={` ${
            disabled ? "bg-white border-0 ring-0" : ""
          } h-9 bg-gray-200`}
          disabled={disabled}
          classLabel="w-44"
        />
        <FormField
          type="text"
          label="عدد الطوابق"
          name="floors"
          register={register}
          error={errors.floors}
          className={` ${
            disabled ? "bg-white border-0 ring-0" : ""
          } h-9 bg-gray-200`}
          disabled={disabled}
          classLabel="w-44"
        />

        <FormField
          type="text"
          label="الغرف المسكونة"
          name="count_haunted_room"
          register={register}
          error={errors.count_haunted_room}
          className={`bg-white border-0 ring-0 h-9`}
          disabled
          classLabel="w-52"
        />

        <div className={`flex justify-end items-center`}>
          <div className="w-36 flex font-bold text-lg">موقع المبني:</div>
          <div className="w-80">
            <Link
              href={"#"}
              className="text-white px-7 py-1 bg-primary-500 hover:bg-primary-600 rounded-md "
            >
              عرض الموقع
            </Link>
          </div>
        </div>
      </div>

      <div className="inset-y-0 left-1/2 transform -translate-x-1/2 w-1 bg-gray-300"></div>

      <div className="flex flex-col gap-3 justify-center items-center">
        <FormField
          type="text"
          label="الغرف المتاحة"
          name="count_room_available"
          register={register}
          error={errors.count_room_available}
          className={`bg-white border-0 ring-0 h-9`}
          disabled
          classLabel="w-44"
        />

        <FormField
          type="text"
          label="اجمالي الغرف"
          name="total_rooms"
          register={register}
          error={errors.total_rooms}
          placeholder="أدخل الاسم الثلاثي"
          className={`bg-white border-0 ring-0 h-9`}
          disabled
          classLabel="w-44"
        />
        {children}
      </div>
    </div>
  );
}
