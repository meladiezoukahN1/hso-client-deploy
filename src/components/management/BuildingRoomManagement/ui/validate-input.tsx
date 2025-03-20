import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldError, Path } from "react-hook-form";
import validateEmail from "@/hooks/validate-email";
import validateLibyanPhoneNumber from "@/hooks/validate-phone";

interface FormFieldProps<T extends Record<string, unknown>> {
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
}

const ValidateFormField = <T extends Record<string, unknown>>({
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
  const validateField = (value: string) => {
    switch (type) {
      case "email":
        return validateEmail(value) || "example@email.com";
      case "tel":
        return validateLibyanPhoneNumber(value) || "رقم الهاتف غير صحيح";
      default:
        return true;
    }
  };

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
          {...register(name, {
            valueAsNumber,
            validate: (value) => {
              if (typeof value === "string") {
                return validateField(value);
              }
              return true;
            },
          })}
          className={`rounded bg-orange-50 w-full ${className} ${
            error ? "border-danger" : "border-secondary"
          }`}
          {...rest}
        />
      </div>
      {error && (
        <span className="mt-2 text-xs text-danger mr-36">
          {error.message || "يجب ملء هذا الحقل!"}
        </span>
      )}
    </div>
  );
};

export default ValidateFormField;
