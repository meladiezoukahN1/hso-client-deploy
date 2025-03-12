import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// BuildingSelector.tsx
interface BuildingSelectorProps {
  buildings: { value: number; label: string }[];
  onSelect: (buildingId: number) => void;
  value?: string; // أضف هذه الخاصية
}

export default function BuildingSelector({
  buildings,
  onSelect,
  value, // أضف هذه الخاصية
}: BuildingSelectorProps) {
  return (
    <div className="flex flex-col items-start w-full ">
      <div className="grid grid-cols-[minmax(120px,1fr)_3fr]  items-center w-full ">
        <label className="font-bold text-right whitespace-nowrap h-10 flex items-center justify-end">
          المبنى:
        </label>
        <Select
          value={value}
          onValueChange={(value) =>
            value !== "default" && onSelect(Number(value))
          }
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
          <SelectContent className="max-h-64 overflow-auto">
            <SelectItem value="default">اختر المبنى</SelectItem>
            {buildings.map((building) => (
              <SelectItem key={building.value} value={String(building.value)}>
                {building.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
