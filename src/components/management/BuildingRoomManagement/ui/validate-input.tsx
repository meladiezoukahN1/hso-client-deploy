import { HTMLInputTypeAttribute, useState } from "react";
import { Input } from "./input";
import validateEmail from "@/hooks/validate-email";
import validateLibyanPhoneNumber from "@/hooks/validate-phone";

interface Prop {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  labelName: string;
  inputName: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  isValaid: (e: boolean) => void;
}

const ValidateInput = ({
  inputName,
  labelName,
  onChange,
  value,
  type = "text",
  placeholder,
  isValaid,
}: Prop) => {
  const [validation, setValidation] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eValue = e.target.value;
    onChange(e);

    switch (type) {
      case "text":
        setValidation(eValue.trim() === "");
        setHint(eValue.trim() === "" ? "يجب ملء هذا الحقل!" : null);
        isValaid(eValue.trim() !== "");
        break;
      case "email":
        setValidation(!validateEmail(eValue));
        setHint(!validateEmail(eValue) ? "example@email.com" : null);
        isValaid(validateEmail(eValue));
        break;
      case "tel":
        setValidation(!validateLibyanPhoneNumber(eValue));
        setHint(
          !validateLibyanPhoneNumber(eValue) ? "رقم الهاتف غير صحيح" : null
        );
        isValaid(validateLibyanPhoneNumber(eValue));
        break;
      default:
        setValidation(false);
        setHint(null);
        isValaid(true);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center">
        <label className="text-right w-24 text-base font-medium mr-2">
          {labelName}
        </label>
        <Input
          type={type}
          name={inputName}
          value={value}
          onChange={handleChange}
          className={`${
            validation ? "border border-danger" : "border border-secondary"
          } 
            w-60 h-8 px-2 rounded-md text-sm
            focus:outline-none focus:ring-1 focus:ring-primary-500
          `}
          placeholder={placeholder}
        />
      </div>
      {hint && <span className="text-xs text-danger mt-1 mr-36">{hint}</span>}
    </div>
  );
};

export default ValidateInput;
