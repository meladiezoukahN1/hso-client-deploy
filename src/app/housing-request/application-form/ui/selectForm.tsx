import React from "react";
import SelectValueComponents from "@/components/ui/SelectValue"; // استيراد المكون الفرعي
import { DataSelect } from "home";
import { FieldErrors } from "react-hook-form";
import { ApplicationFormValues } from "@/validation/landing/landing";
interface SelectFormProps {
  dataCollage: DataSelect[];
  dataGender: DataSelect[];
  dataNationality: DataSelect[];
  datacity: DataSelect[];
  handleSelectValueChange: (
    field: "nationality" | "gender" | "faculty" | "city",
    value: string
  ) => void;
  errors: FieldErrors<ApplicationFormValues>;
  resetKey: number; // إضافة المفتاح
}

const SelectForm: React.FC<SelectFormProps> = ({
  dataCollage,
  dataGender,
  dataNationality,
  datacity,
  handleSelectValueChange,
  errors,
  resetKey, // استقبال المفتاح
}) => {
  return (
    <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 m-auto mx-4">
      {/* الكلية */}
      <div className="flex flex-col mt-2">
        <label className="text-sm md:text-lg">الكلية:</label>
        <SelectValueComponents
          key={resetKey} // استخدام المفتاح
          ClassName="w-full h-8 md:h-10 md:w-[180px]"
          title=""
          data={dataCollage}
          onValueChange={(val) => handleSelectValueChange("faculty", val)}
        />
        {errors.faculty && (
          <span className="text-red-500 text-xs">
            {errors.faculty.message?.toString()}
          </span>
        )}
      </div>

      {/* الجنس */}
      <div className="flex flex-col mt-2">
        <label className="text-sm md:text-lg">الجنس:</label>
        <SelectValueComponents
          key={resetKey} // استخدام المفتاح
          ClassName="w-full h-8 md:h-10 md:w-[180px]"
          title=""
          data={dataGender}
          onValueChange={(val) => handleSelectValueChange("gender", val)}
        />
        {errors.gender && (
          <span className="text-red-500 text-xs">
            {errors.gender.message?.toString()}
          </span>
        )}
      </div>

      {/* الجنسية */}
      <div className="flex flex-col mt-2">
        <label className="text-sm md:text-lg">الجنسية:</label>
        <SelectValueComponents
          key={resetKey} // استخدام المفتاح
          ClassName="w-full h-8 md:h-10 md:w-[180px]"
          title=""
          data={dataNationality}
          onValueChange={(val) => handleSelectValueChange("nationality", val)}
        />
        {errors.nationality && (
          <span className="text-red-500 text-xs">
            {errors.nationality.message?.toString()}
          </span>
        )}
      </div>

      {/* المدينة */}
      <div className="flex flex-col mt-2">
        <label className="text-sm md:text-lg">المدينة:</label>
        <SelectValueComponents
          key={resetKey} // استخدام المفتاح
          ClassName="w-full h-8 md:h-10 md:w-[180px]"
          title=""
          data={datacity}
          onValueChange={(val) => handleSelectValueChange("city", val)}
        />
        {errors.city && (
          <span className="text-red-500 text-xs">
            {errors.city.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectForm;
