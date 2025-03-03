import { ApplicationFormValues } from "@/validation/landing/landing";
import React, { ChangeEvent, useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

const acceptedFiles = [
  { label: "شهادة الميلاد", name: "birthCertificate" },
  { label: "شهادة الإقامة", name: "residencyProof" },
  { label: "صورة شخصية", name: "personalPhotos" },
  { label: "الشهادة الثانوية", name: "secondaryCertificate" },
];

interface InputFormProps {
  register: UseFormRegister<ApplicationFormValues>;
  errors: FieldErrors<ApplicationFormValues>;
  setValue: UseFormSetValue<ApplicationFormValues>;
  resetKey: number;
}

const FileInputFormComponent: React.FC<InputFormProps> = ({
  errors,
  setValue,
  resetKey,
}) => {
  const [fileName, setFileName] = useState({
    birthCertificate: "شهادة الميلاد",
    residencyProof: "شهادة الإقامة",
    personalPhotos: "صورة شخصية",
    secondaryCertificate: "الشهادة الثانوية",
  });

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof ApplicationFormValues
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(fieldName, file, { shouldValidate: true });
      setFileName({ ...fileName, [fieldName]: file.name });
    } else {
      setValue(fieldName, "", { shouldValidate: true });
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-8 mt-10 text-right  text-primary-600">
        ثانياً - قم بتحميل الملفات التالية
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {acceptedFiles.map(({ label, name }) => {
          const fieldName = name as keyof ApplicationFormValues;
          return (
            <div key={name} className="flex items-center">
              <label className="whitespace-nowrap pl-2 text-sm md:text-lg w-32">
                {label}
              </label>
              <label className="relative cursor-pointer border border-[#00007F] px-4 py-1 md:py-2 text-sm md:text-lg flex-1 rounded-md flex items-center justify-center">
                <input
                  key={resetKey} // استخدام المفتاح هنا لإعادة الترسيم
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleFileChange(e, fieldName)}
                />
                {errors[fieldName] ? (
                  <span className="text-red-500 text-xs">
                    {errors[fieldName]?.message?.toString()}
                  </span>
                ) : (
                  <span className="text-sm">
                    {fileName[name as keyof typeof fileName]}
                  </span>
                )}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FileInputFormComponent;
