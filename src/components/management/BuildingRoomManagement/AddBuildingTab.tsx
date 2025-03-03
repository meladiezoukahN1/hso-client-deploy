import { useState } from "react";
import ValidateInput from "./ui/validate-input";
import GeneralDailog from "@/components/ui/GeneralDailog";
import MultiSelect from "@/components/ui/multi-select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { addBuilding } from "@/lib/fetsures/management/action";
import Loading from "@/app/home/loading";
import ErrorMSG from "@/components/ui/error-msg";
import { toast } from "sonner";
import { AddBuilding } from "mangement";

interface FormField {
  value: string;
  isVaild: boolean;
}

interface FormData {
  Buildingname: FormField;
  Numberrooms: FormField;
  Numberfloors: FormField;
  url: FormField;
}

const AddBuildingTab = () => {
  const [formData, setFormData] = useState<FormData>({
    Buildingname: { value: "", isVaild: false },
    Numberrooms: { value: "", isVaild: false },
    Numberfloors: { value: "", isVaild: false },
    url: { value: "", isVaild: false },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSupervisors, setSelectedSupervisors] = useState<
    {
      id: number;
      FullName: string;
    }[]
  >([]);
  const dispatch = useAppDispatch();

  const { isLoading, error, supervisors } = useAppSelector(
    (state) => state.mangement
  );

  const handleSupervisorChange = (values: string[]) => {
    if (values.length <= 3) {
      const list = supervisors.supervisorList
        .filter((s) => values.includes(s.id.toString()))
        .map((v) => ({ id: Number(v.id), FullName: v.FullName }));
      setSelectedSupervisors(list);
    } else {
      toast.error("يمكن اختيار 3 مشرفين فقط");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof FormData],
        value,
      },
    }));
  };

  const handleSubmit = async () => {
    const isFormVaild =
      formData.Buildingname.isVaild &&
      formData.Numberfloors.isVaild &&
      formData.Numberrooms.isVaild &&
      formData.url.isVaild &&
      selectedSupervisors.length > 0;

    if (isFormVaild) {
      try {
        const buildingData: AddBuilding = {
          Name: formData.Buildingname.value,
          NumOfRooms: Number(formData.Numberrooms.value),
          Floors: Number(formData.Numberfloors.value),
          url: formData.url.value,
          supervisors: selectedSupervisors,
        };

        await dispatch(addBuilding(buildingData));
        toast.success("تمت إضافة المبنى بنجاح!");

        setFormData({
          Buildingname: { value: "", isVaild: false },
          Numberrooms: { value: "", isVaild: false },
          Numberfloors: { value: "", isVaild: false },
          url: { value: "", isVaild: false },
        });
        setSelectedSupervisors([]);
      } catch (e) {
        console.error("Error adding building:", e);
        toast.error("حدث خطأ أثناء إضافة المبنى.");
      }
    } else {
      toast.error("يجب تعبئة جميع الحقول واختيار مشرفين");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMSG error={error} />;

  return (
    <div>
      <form className="grid grid-cols-2 px-16 py-10 ">
        <ValidateInput
          inputName="Buildingname"
          labelName="اسم المبنى:"
          onChange={handleChange}
          value={formData.Buildingname.value}
          type="text"
          isValaid={(e) => {
            setFormData((prev) => ({
              ...prev,
              Buildingname: {
                value: prev.Buildingname.value,
                isVaild: e,
              },
            }));
          }}
        />
        <ValidateInput
          inputName="Numberrooms"
          labelName="عدد الغرف:"
          onChange={handleChange}
          value={formData.Numberrooms.value}
          type="text"
          isValaid={(e) => {
            setFormData((prev) => ({
              ...prev,
              Numberrooms: {
                value: prev.Numberrooms.value,
                isVaild: e,
              },
            }));
          }}
        />
        <ValidateInput
          inputName="Numberfloors"
          labelName="عدد الأدوار:"
          onChange={handleChange}
          value={formData.Numberfloors.value}
          type="text"
          isValaid={(e) => {
            setFormData((prev) => ({
              ...prev,
              Numberfloors: {
                value: prev.Numberfloors.value,
                isVaild: e,
              },
            }));
          }}
        />
        <ValidateInput
          inputName="url"
          labelName="الموقع:"
          onChange={handleChange}
          value={formData.url.value}
          type="text"
          isValaid={(e) => {
            setFormData((prev) => ({
              ...prev,
              url: {
                value: prev.url.value,
                isVaild: e,
              },
            }));
          }}
        />
        <div className="flex items-center mt-4">
          <MultiSelect
            label="المشرفين"
            options={
              supervisors.supervisorList.map((s) => ({
                value: s.id.toString(),
                label: s.FullName,
              })) || []
            }
            value={selectedSupervisors.map((s) => s.id.toString())}
            onChange={handleSupervisorChange}
            placeholder="اختر المشرفين"
          />
        </div>
      </form>
      <div
        className={`bg-primary-700 text-white px-6 py-2 text-center rounded-md hover:bg-primary-600 w-80 cursor-pointer mx-auto `}
        onClick={() => {
          const isFormVaild =
            formData.Buildingname.isVaild &&
            formData.Numberfloors.isVaild &&
            formData.Numberrooms.isVaild &&
            formData.url.isVaild &&
            selectedSupervisors.length > 0 &&
            Number(formData.Numberfloors.value) &&
            Number(formData.Numberrooms.value);
          if (isFormVaild) {
            setIsOpen(true);
          } else {
            toast.error("يجب تعبئة جميع الحقول واختيار مشرفين");
          }
        }}
      >
        <span>{"إضافة مبنى"}</span>
      </div>
      <div className="text-center w-full">
        <GeneralDailog
          clasName="mt-4"
          dialogTitle="هل أنت متأكد أنك تريد إضافة هذا المبنى؟"
          description={`قد لا تتمكن من التراجع بعد إتمامها`}
          onConfirm={handleSubmit}
          onOpenChange={(e) => setIsOpen(e)}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

export default AddBuildingTab;
