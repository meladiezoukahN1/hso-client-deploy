import { Button } from "@/components/ui/button";

interface RoleButtonsProps {
  role: string;
  handleRoleChange: (role: string) => void;
}

export default function RoleButtons({
  role,
  handleRoleChange,
}: RoleButtonsProps) {
  return (
    <div className="flex gap-4">
      <label className="text-right w-40 text-lg font-bold mr-6">الدور:</label>
      <Button
        type="button"
        onClick={() => handleRoleChange("مسؤول")}
        className={`w-44 h-10 text-black hover:bg-primary-600 hover:text-white ${
          role === "مسؤول"
            ? "bg-primary-700 text-white"
            : "bg-orange-50 border border-primary-700"
        }`}
      >
        مسؤول
      </Button>
      <Button
        type="button"
        onClick={() => handleRoleChange("موظف")}
        className={`w-44 h-10 text-black hover:bg-primary-600 hover:text-white ${
          role === "موظف"
            ? "bg-primary-700 text-white"
            : "bg-orange-50 border border-primary-700"
        }`}
      >
        موظف
      </Button>
    </div>
  );
}
