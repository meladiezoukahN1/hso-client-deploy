import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  title: string;
  dataSelecte: { value: string; label: string }[];
  onSelect?: (selected: { value: string; label: string }) => void;
}

const SelectSearchReport: React.FC<SelectProps> = ({
  title,
  dataSelecte,
  onSelect,
}) => {
  const handleSelect = (value: string) => {
    const selectedItem = dataSelecte.find((item) => item.value === value);
    if (selectedItem && onSelect) {
      onSelect(selectedItem);
    }
  };

  return (
    <div className="select-container">
      <Select dir="rtl" onValueChange={handleSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dataSelecte.map((select) => (
              <SelectItem key={select.value} value={select.value}>
                {select.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSearchReport;
