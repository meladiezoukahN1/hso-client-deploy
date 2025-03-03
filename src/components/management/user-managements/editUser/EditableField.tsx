"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "./input-validate";
import { EditUserType } from "@/validation/managements/user";

interface EditableFieldProps {
  register: UseFormRegister<EditUserType>;
  errors: FieldErrors<EditUserType>;
  disabled: boolean;
}

export default function EditableField({
  register,
  errors,
  disabled,
}: EditableFieldProps) {
  return (
    <div className="grid grid-cols-1 md:flex md:gap-6 relative">
      <div className="flex flex-col gap-6 md:border-l-4 border-secondary md:pl-2">
        <FormField
          label="الاسم الثلاثي"
          type="text"
          placeholder="أدخل الاسم الثلاثي"
          name="FullName"
          register={register}
          error={errors.FullName}
          disabled={disabled}
          className={`${disabled ? "border-0 ring-0" : ""}`}
        />
        <FormField
          label="اسم المستخدم"
          type="text"
          placeholder="اسم المستخدم"
          name="username"
          register={register}
          error={errors.username}
          disabled={disabled}
          className={`${disabled ? "border-0 ring-0" : ""}`}
        />
      </div>

      <div className="flex flex-col gap-6">
        <FormField
          label="رقم الهاتف"
          type="text"
          placeholder="أدخل رقم الهاتف"
          name="phone"
          register={register}
          error={errors.phone}
          disabled={disabled}
          className={`${disabled ? "border-0 ring-0" : ""}`}
        />
        <FormField
          label="البريد الالكتروني"
          type="text"
          placeholder="أدخل البريد الالكتروني"
          name="email"
          register={register}
          error={errors.email}
          disabled={disabled}
          className={`${disabled ? "border-0 ring-0" : ""}`}
        />
      </div>
    </div>
  );
}
