import { UseFormRegister, FieldError, Path } from "react-hook-form";

export type SelectFieldProps<T extends object> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  options: { value: number; label: string }[];
  className?: string;
  classWrapper?: string;
};

const SelectField = <T extends object>({
  name,
  label,
  register,
  error,
  options,
  className,
  classWrapper,
}: SelectFieldProps<T>) => {
  return (
    <div className={`flex items-center space-x-4 ${classWrapper ?? ""}`}>
      <label className="w-40 text-right text-lg font-bold text-[#1D242E]">
        {label}:
      </label>
      <div>
        <select
          {...register(name)}
          className={`w-72 h-10 bg-gray-300 ring-1 ring-red-800 rounded-xl text-center focus:ring-2 focus:ring-red-800 text-base ${className}`}
        >
          <option value="">اختر موظف</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="block min-h-5 text-xs text-red-600">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectField;
