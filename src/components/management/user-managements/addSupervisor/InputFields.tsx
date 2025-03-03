"use client";

import { FormField } from "@/components/ui";
import { AddSupervisorType } from "@/validation/managements/supervisor";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface InputFieldsProps {
  register: UseFormRegister<AddSupervisorType>;
  errors: FieldErrors<AddSupervisorType>;
}

export default function InputFields({ register, errors }: InputFieldsProps) {
  return (
    <>
      <FormField
        label="الاسم الثلاثي"
        type="text"
        placeholder="أدخل الاسم الثلاثي"
        name="Fullname"
        register={register}
        error={errors.Fullname}
      />
      <FormField
        label="عنوان السكن"
        type="text"
        placeholder="أدخل عنوان السكن"
        name="address"
        register={register}
        error={errors.address}
      />
      <FormField
        label="رقم الهاتف"
        type="text"
        placeholder="أدخل رقم الهاتف"
        name="Phone"
        register={register}
        error={errors.Phone}
      />
      <FormField
        label="البريد الإلكتروني"
        type="email"
        placeholder="أدخل البريد الإلكتروني"
        name="Email"
        register={register}
        error={errors.Email}
      />
    </>
  );
}
