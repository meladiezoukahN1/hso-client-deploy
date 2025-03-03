import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ApplicationFormValues } from "@/validation/landing/landing";
import { FormField } from "@/components/ui";

interface InputFormProps {
  register: UseFormRegister<ApplicationFormValues>;
  errors: FieldErrors<ApplicationFormValues>;
}

const InputForm: React.FC<InputFormProps> = ({ register, errors }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-4 text-primary-600">
        أولاً - قم بتعبئة البيانات الشخصية
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          classWrapper="justify-start"
          type="text"
          name="FirstName"
          register={register}
          error={errors.FirstName}
          label="الاسم الاول"
          placeholder="الاسم الاول"
          className="h-6 md:h-auto bg-white ml-2 md:m-auto ring-0"
          classContainer=""
        />

        <FormField
          type="text"
          name="MidName"
          register={register}
          error={errors.MidName}
          label="الاسم الاوسط"
          placeholder="الاسم الاوسط"
          className="h-6 md:h-auto bg-white ml-2 md:m-auto ring-0"
          classContainer=""
        />

        <FormField
          type="text"
          name="LastName"
          register={register}
          error={errors.LastName}
          label="الاسم الاخير"
          placeholder="الاسم الاخير"
          className="h-6 md:h-auto bg-white ml-2 md:m-auto ring-0"
          classContainer=""
        />

        <FormField
          type="text"
          name="NatNo"
          register={register}
          error={errors.NatNo}
          label="الرقم الوطني"
          placeholder="الرقم الوطني"
          className="h-6 md:h-auto bg-white ml-2 md:m-auto ring-0"
          classContainer=""
        />

        <FormField
          type="email"
          name="Email"
          register={register}
          error={errors.Email}
          label="البريد الالكتروني"
          placeholder="البريد الالكتروني"
          className="h-6 md:h-auto bg-white ml-2 md:m-auto ring-0"
          classContainer=""
        />

        <FormField
          type="date"
          name="DOB"
          register={register}
          error={errors.DOB}
          label="تاريخ الميلاد"
          className="h-6 md:h-auto bg-white ml-2 md:m-auto ring-0 p-0 md:p-3"
        />

        <FormField
          type="text"
          name="Phone"
          register={register}
          error={errors.Phone}
          label="رقم الهاتف"
          placeholder="رقم الهاتف"
          className="h-6 md:h-auto bg-white ml-2 md:m-auto ring-0"
          classContainer=""
        />

        <FormField
          type="text"
          name="studentID"
          register={register}
          error={errors.studentID}
          label="رقم القيد"
          placeholder="رقم القيد"
          className="h-6 md:h-auto bg-white ml-2 md:m-auto ring-0"
        />
      </div>
    </div>
  );
};

export default InputForm;
