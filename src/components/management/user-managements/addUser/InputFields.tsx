import FormField from "./input-validate";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import RoleButtons from "./RoleButtons";
import { AddUserType } from "@/validation/managements/user";

interface InputFieldsProps {
  register: UseFormRegister<AddUserType>;
  errors: FieldErrors<AddUserType>;
  role: string;
  handleRoleChange: (role: string) => void;
}

export default function InputFields({
  register,
  errors,
  role,
  handleRoleChange,
}: InputFieldsProps) {
  return (
    <>
      <FormField
        label="الاسم الكامل"
        type="text"
        placeholder="أدخل الاسم الكامل"
        name="FullName"
        register={register}
        error={errors.FullName}
      />
      <FormField
        label="اسم المستخدم"
        type="text"
        placeholder="أدخل اسم المستخدم"
        name="username"
        register={register}
        error={errors.username}
      />
      <FormField
        label="رقم الهاتف"
        type="text"
        placeholder="أدخل رقم الهاتف"
        name="phone"
        register={register}
        error={errors.phone}
      />
      <FormField
        label="العنوان"
        type="text"
        placeholder="أدخل العنوان"
        name="address"
        register={register}
        error={errors.address}
      />
      <RoleButtons role={role} handleRoleChange={handleRoleChange} />
      <FormField
        label="البريد الإلكتروني"
        type="email"
        placeholder="أدخل البريد الإلكتروني"
        name="email"
        register={register}
        error={errors.email}
      />
    </>
  );
}
