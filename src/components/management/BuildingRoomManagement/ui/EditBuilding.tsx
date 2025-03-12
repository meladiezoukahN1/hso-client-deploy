"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormField } from "@/components/ui";
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
    <div className="flex flex-col gap-6">
      <div className="flex gap-8 items-start">
        <div className="flex flex-col gap-4 flex-1">
          <FormField
            type="text"
            label="اسم المبنى"
            name="name_building"
            register={register}
            error={errors.name_building}
            className="h-10 bg-gray-100"
            disabled={disabled}
          />

          <FormField
            type="text"
            label="الغرف المتاحة"
            name="count_room_available"
            register={register}
            error={errors.count_room_available}
            className="h-10 bg-gray-100 border-0"
            disabled
          />
          <FormField
            type="text"
            label="الغرف المسكونة"
            name="count_haunted_room"
            register={register}
            error={errors.count_haunted_room}
            className="h-10 bg-gray-100 border-0"
            disabled
          />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <FormField
            type="text"
            label="عدد الطوابق"
            name="floors"
            register={register}
            error={errors.floors}
            className="h-10 bg-gray-100 border-0"
            disabled
          />

          <FormField
            type="text"
            label="إجمالي الغرف"
            name="total_rooms"
            register={register}
            error={errors.total_rooms}
            className="h-10 bg-gray-100 border-0"
            disabled
          />
          <div className="flex items-center gap-4 mr-[3%]">
            <span className="font-bold">موقع المبنى:</span>
            <Link
              href={"#"}
              className="text-white w-3/4 text-center py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              عرض الموقع
            </Link>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
