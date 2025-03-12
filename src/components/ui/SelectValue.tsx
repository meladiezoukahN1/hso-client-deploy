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
  data: {
    value: string | number;
    label: string;
  }[];
  onValueChange: (e: string) => void;
  ClassName?: string;
  value?: string;
  defaultLabel?: string;
}

const SelectValueComponents = ({
  title,
  value,
  data = [],
  onValueChange,
  ClassName,
  defaultLabel = "الكل",
}: SelectProps) => {
  return (
    <Select dir="rtl" onValueChange={onValueChange} value={value}>
      <SelectTrigger
        className={` w-[38%] h-10 border-2 border-gray-300 rounded-lg bg-orange-50 hover:bg-orange-100 focus:ring-2 focus:ring-orange-500 ${ClassName}`}
      >
        <div className="text-right px-3">
          <SelectValue
            placeholder={<span className="text-gray-500">{title}</span>}
          />
        </div>
      </SelectTrigger>

      <SelectContent className="border-2 border-gray-300 bg-orange-50 max-h-64 overflow-auto">
        <SelectGroup>
          <SelectItem value="none" className="text-right hover:bg-orange-100">
            {defaultLabel}
          </SelectItem>

          {data.length > 0 ? (
            data.map((select, index) => (
              <SelectItem
                key={index}
                value={select.value.toString()}
                className="text-right hover:bg-orange-100"
              >
                {select.label}
              </SelectItem>
            ))
          ) : (
            <div className="text-sm text-center p-2 text-gray-500">
              لا توجد بيانات لعرضها
            </div>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectValueComponents;
