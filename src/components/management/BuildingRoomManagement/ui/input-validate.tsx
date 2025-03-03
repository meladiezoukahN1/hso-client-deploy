import { UseFormRegister, FieldError, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";

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
  className = "border w-80 h-10",
  error,
  valueAsNumber,
  classWrapper,
  classLabel,
  label,
  classContainer,
  ...rest
}: FormFieldProps<T>) => {
  return (
    <div className={`flex flex-col items-end ${classWrapper}`}>
      <div className={`flex gap-x-4 items-center ${classContainer}`}>
        {label && <div className={`font-bold ${classLabel}`}>{label}:</div>}
        <Input
          type={type}
          placeholder={placeholder || ""}
          {...register(name, { valueAsNumber })}
          className={`ring-1 ring-secondary focus:ring-2 focus:ring-secondary resize-none rounded bg-orange-50 ${className}`}
          {...rest}
        />
      </div>
      <span className="mt-2 text-xs text-danger">{error?.message}</span>
    </div>
  );
};

export default FormField;
