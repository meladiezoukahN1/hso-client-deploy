import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Select as SelectType } from "mangement";

// RoomSelector.tsx
interface RoomSelectorProps {
  rooms: SelectType[];
  onSelect: (id: number) => void;
  disabled?: boolean;
  value?: string; // أضف هذه الخاصية
}

export default function RoomSelector({
  rooms,
  onSelect,
  disabled,
  value, // أضف هذه الخاصية
}: RoomSelectorProps) {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="grid grid-cols-[minmax(120px,1fr)_3fr] gap-x-4 items-center w-full">
        <label className="font-bold text-right whitespace-nowrap  h-10 flex items-center justify-start">
          الغرفة:
        </label>
        <Select
          value={value}
          onValueChange={(v) => v !== "default" && onSelect(Number(v))}
          disabled={disabled}
        >
          {" "}
          <SelectTrigger
            dir="rtl"
            className={`w-full h-10 border rounded ${
              disabled ? "bg-gray-100" : "bg-orange-50"
            }`}
          >
            <div className="w-full text-center">
              <SelectValue
                placeholder={
                  <span className="text-muted-foreground">
                    {disabled ? "يرجى اختيار المبنى أولاً" : "اختر الغرفة"}
                  </span>
                }
              />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-64 overflow-auto" dir="rtl">
            <SelectItem value="default">اختر الغرفة</SelectItem>
            {rooms.map((r) => (
              <SelectItem key={r.value} value={String(r.value)}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
