// BuildingSelector.tsx
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface BuildingSelectorProps {
  buildings: { id: number; name_building: string }[];
  onSelect: (buildingId: number) => void;
  value?: string; // إضافة خاصية value
}

export default function BuildingSelector({
  buildings,
  onSelect,
  value,
}: BuildingSelectorProps) {
  return (
    <div className="flex flex-col items-start w-full ">
      <div className="grid grid-cols-[minmax(120px,1fr)_3fr] gap-x-4 items-center w-full">
        <label className="font-bold text-right whitespace-nowrap pr-2 h-10 flex items-center justify-start">
          المبنى:
        </label>
        <Select
          value={value}
          onValueChange={(val) => val !== "default" && onSelect(Number(val))}
        >
          {" "}
          <SelectTrigger className="w-full h-10 border rounded bg-orange-50">
            <div className="w-full text-center">
              <SelectValue
                placeholder={
                  <span className="text-muted-foreground">اختر المبنى</span>
                }
              />
            </div>
          </SelectTrigger>
          <SelectContent dir="rtl" className="max-h-64 overflow-auto text-right">
            <SelectItem value="default" className="text-right">اختر المبنى</SelectItem>
            {buildings.map((building) => (
              <SelectItem className="text-right" key={building.id} value={String(building.id)}>
                {building.name_building}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
