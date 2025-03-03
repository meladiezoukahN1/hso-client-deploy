interface BuildingSelectorProps {
  buildings: { id: number; name_building: string }[];
  onSelect: (buildingId: number) => void;
}

export default function BuildingSelector({
  buildings,
  onSelect,
}: BuildingSelectorProps) {
  return (
    <div className="flex items-center gap-6 mb-6 mt-4">
      <label className="ml-4 font-bold">المبنى:</label>
      <select
        onChange={(e) => onSelect(Number(e.target.value))}
        className="border p-2 rounded-md w-52 bg-white text-right"
      >
        <option value="">اختر المبنى</option>
        {buildings.map((building) => (
          <option key={building.id} value={building.id}>
            {building.name_building}
          </option>
        ))}
      </select>
    </div>
  );
}
