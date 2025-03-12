"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "./input-validate";
import { EditSuperVisorType } from "@/validation/managements/supervisor";

interface EditableFieldProps {
  register: UseFormRegister<EditSuperVisorType>;
  errors: FieldErrors<EditSuperVisorType>;
  disabled: boolean;
}

export default function EditableField({
  register,
  errors,
  disabled,
}: EditableFieldProps) {
  return (
    <div className="md:flex md:gap-6 relative">
      <div className="flex flex-col gap-6">
        <FormField
          label="الاسم الثلاثي"
          type="text"
          placeholder="أدخل الاسم الثلاثي"
          name="Fullname"
          register={register}
          error={errors.Fullname}
          disabled={!disabled}
          className={`${disabled ? "border-0 ring-0" : ""}`}
        />
        <FormField
          label="عنوان السكن"
          type="text"
          placeholder="عنوان السكن"
          name="address"
          register={register}
          error={errors.address}
          disabled={!disabled}
          className={`${disabled ? "border-0 ring-0" : ""}`}
        />
      </div>

      <div className="flex flex-col gap-6">
        <FormField
          label="رقم الهاتف"
          type="text"
          placeholder="أدخل رقم الهاتف"
          name="Phone"
          register={register}
          error={errors.Phone}
          disabled={!disabled}
          className={`${disabled ? "border-0 ring-0" : ""}`}
        />
        <FormField
          label="البريد الالكتروني"
          type="text"
          placeholder="أدخل البريد الالكتروني"
          name="Email"
          register={register}
          error={errors.Email}
          disabled={!disabled}
          className={`${disabled ? "border-0 ring-0" : ""}`}
        />
      </div>
    </div>
  );
}
