"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormField } from "@/components/ui";
import { EditSuperVisorType } from "@/validation/managements/supervisor";

interface EditFieldProps {
  register: UseFormRegister<EditSuperVisorType>;
  errors: FieldErrors<EditSuperVisorType>;
  disabled: boolean;
}

export default function EditField({
  register,
  errors,
  disabled,
}: EditFieldProps) {
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
          className={`${disabled ? "border-0 ring-0" : ""}`}
        />
        <FormField
          label="العنوان"
          type="text"
          placeholder="العنوان"
          name="address"
          register={register}
          error={errors.address}
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
          className={`${disabled ? "border-0 ring-0" : ""}`}
        />
        <FormField
          label="البريد الالكتروني"
          type="text"
          placeholder="أدخل البريد الالكتروني"
          name="Email"
          register={register}
          error={errors.Email}
          className={`${disabled ? "border-0 ring-0" : ""}`}
        />
      </div>
    </div>
  );
}
