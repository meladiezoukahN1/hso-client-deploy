import { BasicSupervisor } from "mangement";

interface SupervisorSelectorProps {
  supervisors: BasicSupervisor[];
  onSelect: (supervisorId: number) => void;
  disabled: boolean;
}

export default function SupervisorSelector({
  supervisors,
  onSelect,
  disabled,
}: SupervisorSelectorProps) {
  return (
    <div className="flex items-center mb-6 gap-6 mt-4">
      <label className="ml-4 font-bold">المشرفين:</label>
      <select
        onChange={(e) => onSelect(Number(e.target.value))}
        disabled={disabled}
        className="border p-2 rounded-md w-52 bg-white text-right"
      >
        <option value="">
          {disabled ? "يرجى اختيار المبنى أولاً" : "اختر المشرف"}
        </option>
        {supervisors.map((supervisor) => (
          <option key={supervisor.id} value={supervisor.id}>
            {supervisor.name}
          </option>
        ))}
      </select>
    </div>
  );
}
