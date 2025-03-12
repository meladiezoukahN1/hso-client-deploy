import { useState } from "react";
import { UseFormRegister, FieldError, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { HiOutlinePencilAlt, HiCheck } from "react-icons/hi";

export type FormFieldProps<T extends Record<string, unknown>> = {
  type: string;
  placeholder?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  valueAsNumber?: boolean;
  className?: string;
  classWrapper?: string;
  classLabel?: string;
  label?: string;
  classContainer?: string;
  [key: string]: unknown;
};

const FormField = <T extends Record<string, unknown>>({
  type,
  placeholder,
  name,
  register,
  className = "border h-10",
  error,
  valueAsNumber,
  classWrapper,
  classLabel,
  label,
  classContainer,
  ...rest
}: FormFieldProps<T>) => {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className={`flex flex-col items-end ${classWrapper}`}>
      <div className={`flex gap-x-4 items-center ${classContainer}`}>
        {label && <div className={`font-bold ${classLabel}`}>{label}:</div>}
        <div className="flex gap-2 items-center">
          <Input
            type={type}
            placeholder={placeholder || ""}
            {...register(name, { valueAsNumber })}
            className={`rounded ${className} ${
              isEditable ? "border" : "bg-gray-100"
            } `}
            disabled={!isEditable}
            {...rest}
          />
          {isEditable ? (
            <HiCheck
              onClick={() => setIsEditable(false)}
              className="cursor-pointer"
              size={32}
            />
          ) : (
            <HiOutlinePencilAlt
              onClick={() => setIsEditable(true)}
              className="cursor-pointer"
              size={32}
            />
          )}
        </div>
      </div>
      <span className="mt-2 text-xs text-danger">{error?.message}</span>
    </div>
  );
};

export default FormField;
