import { Input } from "@/components/ui/input";

const FormInput = ({
  label,
  name,
  value,
  type,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex">
      <label className="text-right w-40 text-lg font-bold">{label}</label>
      <Input
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-secondary w-96 h-9 bg-muted-foreground"
      />
    </div>
  );
};

export default FormInput;
