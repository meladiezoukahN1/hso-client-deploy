"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ValidateFormField from "./ui/validate-input";
import GeneralDailog from "@/components/ui/GeneralDailog";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { showBuilding, addRoom } from "@/lib/fetsures/management/action";
import { AddRoom } from "mangement";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// تعريف نوع بيانات النموذج لتحسين الأمان في التحقق من الأنواع
type RoomFormData = {
  RoomNo: number;
  FloorNo: number;
  MaxResidents: number;
  buildingID: string;
};

const schema = yup.object().shape({
  RoomNo: yup
    .number()
    .typeError("يجب أن يكون رقماً")
    .positive("يجب أن يكون رقم موجب")
    .lessThan(41, "يجب أن يكون أقل من 41")
    .required("مطلوب"),
  FloorNo: yup
    .number()
    .typeError("يجب أن يكون رقماً")
    .integer("يجب ان يكون رقم صحيح")
    .positive("يجب أن يكون رقم موجب")
    .lessThan(3, "يجب أن يكون أقل من 3")
    .required("مطلوب"),
  MaxResidents: yup
    .number()
    .typeError("يجب أن يكون رقماً")
    .positive("يجب أن يكون رقم موجب")
    .lessThan(4, "يجب أن يكون أقل من 4")
    .required("مطلوب"),
  buildingID: yup.string().required("يجب اختيار مبنى"),
});

const AddRoomTab: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<RoomFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      RoomNo: 0,
      FloorNo: 0,
      MaxResidents: 0,
      buildingID: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, error, buildings } = useAppSelector(
    (state) => state.mangement
  );

  useEffect(() => {
    dispatch(showBuilding());
  }, [dispatch]);

  const onSubmit = async (data: RoomFormData) => {
    try {
      const roomData: AddRoom = {
        RoomNo: Number(data.RoomNo),
        FloorNo: Number(data.FloorNo),
        MaxResidents: Number(data.MaxResidents),
        buildingID: data.buildingID,
      };

      await dispatch(addRoom(roomData));
      reset();
      toast.success("تمت إضافة الغرفة بنجاح!");
    } catch (e) {
      console.error(e);
      toast.error("حدث خطأ أثناء إضافة الغرفة.");
    }finally{
      setIsOpen(false);
    }
  };

  return (
    <div className="md:p-7">
      <div className="flex gap-0 md:gap-4 items- mb-6">
        <label className="text-right w-40 text-lg font-bold px-2 md:px-6 py-2">
          المبنى:
        </label>
        {isLoading ? (
          <p>جاري التحميل...</p>
        ) : error ? (
          <p>حدث خطأ أثناء جلب البيانات</p>
        ) : (
          <div className="flex flex-wrap gap-1 md:gap-4">
            {buildings.buildingList.map((building) => (
              <Button
                key={building.id}
                type="button"
                onClick={() => setValue("buildingID", building.id.toString())}
               className={`w-32 md:w-44 h-10 hover:bg-primary-700 hover:text-white ${
                  watch("buildingID") === building.id.toString()
                    ? "bg-secondary text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {building.name_building}
              </Button>
            ))}
          </div>
        )}
        {errors.buildingID && (
          <span className="text-red-500 text-sm">
            {errors.buildingID.message}
          </span>
        )}
      </div>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 py-6">
          <ValidateFormField
            label="رقم الغرفة"
            name="RoomNo"
            type="number"
            register={register}
            error={errors.RoomNo}
            placeholder="أدخل رقم الغرفة"
          />

          <ValidateFormField
            label="سعة الغرفة"
            name="MaxResidents"
            type="number"
            register={register}
            error={errors.MaxResidents}
            placeholder="أدخل السعة القصوى"
          />

          <ValidateFormField
            label="رقم الدور"
            name="FloorNo"
            type="number"
            register={register}
            error={errors.FloorNo}
            placeholder="أدخل رقم الدور"
          />
        </div>
        <div className="text-center">
          <Button
            onClick={handleSubmit(() => setIsOpen(true))}
            className="bg-primary-700 text-white px-6 py-2 text-lg hover:bg-primary-600 w-80"
          >
            أضف الغرفة
          </Button>
        </div>
      </form>

      <GeneralDailog
        // className="mt-4"
        dialogTitle="هل أنت متأكد أنك تريد إضافة هذه الغرفة؟"
        description="قد لا تتمكن من التراجع بعد إتمامها"
        onConfirm={handleSubmit(onSubmit)}
        onOpenChange={setIsOpen}
        isOpen={isOpen}
      />
    </div>
  );
};

export default AddRoomTab;
