// SupervisorSelector.tsx
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { BasicSupervisor } from "mangement";

interface SupervisorSelectorProps {
  supervisors: BasicSupervisor[];
  onSelect: (supervisorId: number) => void;
  disabled: boolean;
  value?: string; // إضافة خاصية value
}

export default function SupervisorSelector({
  supervisors,
  onSelect,
  disabled,
  value,
}: SupervisorSelectorProps) {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="grid grid-cols-[minmax(120px,1fr)_3fr] gap-x-4 items-center w-full">
        <label className="font-bold text-right whitespace-nowrap pr-2 h-10 flex items-center justify-end mr-[120%]">
          المشرفين:
        </label>
        <Select
          value={value}
          onValueChange={(val) => val !== "default" && onSelect(Number(val))}
          disabled={disabled}
        >
          <SelectTrigger className="w-full h-10 border rounded bg-orange-50 mr-[10%]">
            <div className="w-full text-center">
              <SelectValue placeholder="اختر المشرف" />
            </div>
          </SelectTrigger>
          <SelectContent dir="rtl" className="max-h-64 overflow-auto">
            <SelectItem value="default">
              {disabled ? "يرجى اختيار المبنى أولاً" : "اختر المشرف"}
            </SelectItem>
            {supervisors.map((supervisor) => (
              <SelectItem key={supervisor.id} value={String(supervisor.id)}>
                {supervisor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
