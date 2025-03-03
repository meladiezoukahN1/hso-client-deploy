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
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select options",
}) => {
  const handleChange = (selectedOptions: MultiValue<Option>) => {
    const values = selectedOptions.map((option) => option.value);
    onChange(values);
  };

  const selectedValues = options.filter((option) =>
    value.includes(option.value)
  );

  return (
    <div className="flex items-center justify-end">
      <label className="text-right w-40 text-lg font-bold ">{label}:</label>
      <Select
        isMulti
        options={options || []}
        value={selectedValues || []}
        onChange={handleChange}
        placeholder={placeholder}
        className="basic-multi-select ml-5"
        classNamePrefix="select"
        styles={{
          control: (base) => ({
            ...base,
            width: "320px",
            backgroundColor: "#fff8f1",
          }),
        }}
      />
    </div>
  );
};

export default MultiSelect;
