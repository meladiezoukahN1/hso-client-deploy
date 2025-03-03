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
    value: string;
    label: string;
  }[];
  onValueChange: (e: string) => void;
  ClassName?: string;
  value?: string;
}

const SelectValueComponents = ({
  title,
  value,
  data = [],
  onValueChange,
  ClassName,
}: SelectProps) => {
  return (
    <Select
      dir="rtl"
      onValueChange={(value) => onValueChange(value)}
      value={value}
    >
      <SelectTrigger className={`${ClassName ? ClassName : "w-[180px]"}`}>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="none">الكل</SelectItem>
          {data.length > 0 ? (
            data.map((select, index) => (
              <SelectItem key={index} value={`${select.value}`}>
                {select.label}
              </SelectItem>
            ))
          ) : (
            <div className="text-sm text-center">لا توجد بيانات لعرضها</div>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectValueComponents;
