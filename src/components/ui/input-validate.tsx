// FormField.tsx
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
  className = "border h-10",
  classLabel,
  label,
  error,
  valueAsNumber,
  classWrapper,
  classContainer,
  ...rest
}: FormFieldProps<T>) => {
  return (
    <div className={`flex flex-col items-start ${classWrapper} w-full`}>
      <div
        className={`grid grid-cols-[minmax(120px,1fr)_3fr] gap-x-4 items-center w-full ${classContainer}`}
      >
        {label && (
          <label
            htmlFor={name}
            className={`font-bold text-right whitespace-nowrap pr-2 h-10 flex items-center justify-start ${classLabel}`}
          >
            {label}:
          </label>
        )}
        <Input
          type={type}
          placeholder={placeholder || ""}
          {...register(name, { valueAsNumber })}
          className={`rounded bg-orange-50 w-full ${className}`}
          {...rest}
        />
        {label && <span></span>}
        <span className="mt-2 text-xs text-danger">{error?.message}</span>
      </div>
    </div>
  );
};

export default FormField;
