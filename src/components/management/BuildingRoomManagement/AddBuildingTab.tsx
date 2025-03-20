import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import GeneralDailog from "@/components/ui/GeneralDailog";
import MultiSelect from "@/components/ui/multi-select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { addBuilding } from "@/lib/fetsures/management/action";
import ErrorMSG from "@/components/ui/error-msg";
import { toast } from "sonner";
import { AddBuilding } from "mangement";
import ValidateFormField from "./ui/validate-input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DailogLoading } from "@/components/ui";

const schema = yup.object().shape({
  Buildingname: yup.string().required("يجب إدخال اسم المبنى"),
  Numberrooms: yup
    .number()
    .typeError("يجب أن يكون رقمًا")
    .positive("يجب أن يكون رقمًا موجبًا")
    .required("يجب إدخال عدد الغرف"),
  Numberfloors: yup
    .number()
    .typeError("يجب أن يكون رقمًا")
    .positive("يجب أن يكون رقمًا موجبًا")
    .required("يجب إدخال عدد الأدوار"),
  url: yup.string().url("رابط غير صحيح").required("يجب إدخال الموقع"),
  supervisors: yup
    .array()
    .of(yup.string().required())
    .min(1, "يجب اختيار مشرف واحد على الأقل")
    .max(3, "يمكن اختيار 3 مشرفين فقط")
    .required("يجب اختيار مشرف واحد على الأقل"),
});

const AddBuildingTab = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    Buildingname: string;
    Numberrooms: number;
    Numberfloors: number;
    url: string;
    supervisors: string[];
  }>({
    resolver: yupResolver(schema),
    defaultValues: {
      Buildingname: "",
      Numberrooms: 0,
      Numberfloors: 0,
      url: "",
      supervisors: [],
    },
  });

  // state لإظهار الديالوج وتخزين البيانات المُحققة
  const [isOpen, setIsOpen] = useState(false);
  const [validatedData, setValidatedData] = useState<{
    Buildingname: string;
    Numberrooms: number;
    Numberfloors: number;
    url: string;
    supervisors: string[];
  } | null>(null);

  const dispatch = useAppDispatch();
  const { isLoading, error, supervisors } = useAppSelector(
    (state) => state.mangement
  );

  const handleSupervisorChange = (values: string[]) => {
    if (values.length > 3) {
      toast.error("يمكن اختيار 3 مشرفين فقط");
      return values.slice(0, 3);
    }
    return values;
  };

  const handleValidForm = (data: {
    Buildingname: string;
    Numberrooms: number;
    Numberfloors: number;
    url: string;
    supervisors: string[];
  }) => {
    setValidatedData(data);
    setIsOpen(true);
  };

  // عند الضغط على زر التأكيد في الديالوج يتم تنفيذ عملية الإضافة
  const handleConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!validatedData) return;
    try {
      const selectedSupervisors = supervisors.supervisorList
        .filter((s) => validatedData.supervisors.includes(s.id.toString()))
        .map((s) => ({
          id: Number(s.id),
          FullName: s.FullName,
        }));

      const buildingData: AddBuilding = {
        Name: validatedData.Buildingname,
        NumOfRooms: Number(validatedData.Numberrooms),
        Floors: Number(validatedData.Numberfloors),
        url: validatedData.url,
        supervisors: selectedSupervisors,
      };

      await dispatch(addBuilding(buildingData));
      reset();
    } catch (e) {
      console.error("Error adding building:", e);
      toast.error("حدث خطأ أثناء إضافة المبنى");
    } finally {
      setIsOpen(false);
      setValidatedData(null);
    }
  };

  const onError = () => {};

  if (error) return <ErrorMSG error={error} />;

  return (
    <div>
      <form onSubmit={handleSubmit(handleValidForm, onError)}>
        <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
          <ValidateFormField
            label="اسم المبنى"
            name="Buildingname"
            type="text"
            register={register}
            error={errors.Buildingname}
            placeholder="أدخل اسم المبنى"
          />

          <ValidateFormField
            label="عدد الغرف"
            name="Numberrooms"
            type="number"
            register={register}
            error={errors.Numberrooms}
            placeholder="أدخل عدد الغرف"
          />

          <ValidateFormField
            label="عدد الأدوار"
            name="Numberfloors"
            type="number"
            register={register}
            error={errors.Numberfloors}
            placeholder="أدخل عدد الأدوار"
          />

          <div className="flex flex-col gap-2">
            <Controller
              name="supervisors"
              control={control}
              render={({ field }) => (
                <div className="flex md:mr-[6%]">
                  <MultiSelect
                    label="المشرفين"
                    options={
                      supervisors.supervisorList.map((s) => ({
                        value: s.id.toString(),
                        label: s.FullName,
                      })) || []
                    }
                    value={field.value}
                    onChange={(values) => {
                      const filteredValues = handleSupervisorChange(values);
                      field.onChange(filteredValues);
                    }}
                    placeholder="اختر المشرفين"
                    className="flex-1"
                  />
                  {errors.supervisors && (
                    <span className="text-danger text-xs mt-[10%]">
                      {errors.supervisors.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2 mr-[3%]">
            <label htmlFor="url" className="text-sm font-bold text-gray">
              موقع المبنى:
            </label>
            <textarea
              id="url"
              {...register("url")}
              className="border border-gray-300 rounded-md p-3 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary-600 bg-orange-50"
              placeholder="من فضلك قم بإدخال رابط موقع المبنى"
            ></textarea>
            {errors.url && (
              <span className="text-danger text-xs">{errors.url.message}</span>
            )}
          </div>
        </div>

        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="bg-primary-700 text-white px-6 py-2 rounded-md hover:bg-primary-600 w-80"
          >
            إضافة مبنى
          </button>
        </div>
      </form>

      <GeneralDailog
        clasName="mt-4"
        dialogTitle="هل أنت متأكد أنك تريد إضافة هذا المبنى؟"
        description="قد لا تتمكن من التراجع بعد إتمامها"
        onConfirm={handleConfirm}
        onOpenChange={setIsOpen}
        isOpen={isOpen}
      />
      {isLoading && <DailogLoading />}
    </div>
  );
};

export default AddBuildingTab;
