import React from "react";
import Select, { MultiValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label: string;
  className?: string; // أضف هذا السطر
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "اختر المشرفين",
  className = "", // أضف قيمة افتراضية
}) => {
  const handleChange = (selectedOptions: MultiValue<Option>) => {
    const values = selectedOptions.map((option) => option.value);
    onChange(values);
  };

  const selectedValues = options.filter((option) =>
    value.includes(option.value)
  );

  return (
    <div
      className={`flex items-center gap-4 justify-start w-full md:w-[46.5%] ${className}`}
    >
      {" "}
      {/* أضف className هنا */}
      <label className="text-lg font-bold whitespace-nowrap">{label}:</label>
      <Select
        isMulti
        options={options || []}
        value={selectedValues || []}
        onChange={handleChange}
        placeholder={placeholder}
        className="basic-multi-select flex-1"
        classNamePrefix="select"
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#fff8f1",
            textAlign: "right",
            direction: "rtl",
          }),
          menu: (base) => ({
            ...base,
            direction: "rtl",
            textAlign: "right",
          }),
          multiValue: (base) => ({
            ...base,
            direction: "rtl",
            flexDirection: "row-reverse",
          }),
        }}
      />
    </div>
  );
};

export default MultiSelect;
