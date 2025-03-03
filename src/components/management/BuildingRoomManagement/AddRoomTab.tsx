"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ValidateInput from "./ui/validate-input";
import GeneralDailog from "@/components/ui/GeneralDailog";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { showBuilding, addRoom } from "@/lib/fetsures/management/action";
import { AddRoom } from "mangement";

interface FormField {
  value: string | number;
  isVaild: boolean;
}

interface FormData {
  RoomNo: FormField;
  FloorNo: FormField;
  MaxResidents: FormField;
  buildingID: FormField;
}

const AddRoomTab = () => {
  const [formData, setFormData] = useState<FormData>({
    RoomNo: { value: "", isVaild: false },
    FloorNo: { value: "", isVaild: false },
    MaxResidents: { value: "", isVaild: false },
    buildingID: { value: "", isVaild: true },
  });

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, error, buildings } = useAppSelector(
    (state) => state.mangement
  );

  useEffect(() => {
    dispatch(showBuilding());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: {
        value,
        isVaild: value.trim() !== "",
      },
    }));
  };

  const handleRoleChange = (buildingID: string) => {
    setFormData((prev) => ({
      ...prev,
      buildingID: {
        value: buildingID,
        isVaild: true,
      },
    }));
  };

  const validateInputs = () => {
    if (
      formData.RoomNo.isVaild &&
      formData.FloorNo.isVaild &&
      formData.MaxResidents.isVaild &&
      formData.buildingID.isVaild &&
      Number(formData.FloorNo.value) < 3 &&
      Number(formData.MaxResidents.value) < 4 &&
      Number(formData.MaxResidents.value) > 0 &&
      Number(formData.FloorNo.value) > 0 &&
      Number(formData.RoomNo.value) < 41 &&
      Number(formData.RoomNo.value) > 0
    ) {
      setIsOpen(true);
    } else {
      toast.warning("يجب تعبئة جميع الحقول بشكل صحيح.");
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const addRoomData: AddRoom = {
      RoomNo: formData.RoomNo,
      FloorNo: formData.FloorNo,
      MaxResidents: formData.MaxResidents,
      buildingID: formData.buildingID,
    };

    try {
      await dispatch(addRoom(addRoomData));
      setFormData({
        RoomNo: { value: "0", isVaild: false },
        FloorNo: { value: 0, isVaild: false },
        MaxResidents: { value: 0, isVaild: false },
        buildingID: { value: "", isVaild: true },
      });
    } catch (e) {
      console.error(e);
      toast.error("حدث خطأ أثناء إضافة الغرفة.");
    } finally {
    }
  };

  return (
    <div className="p-7">
      <div className="flex gap-4">
        <label className="text-right w-40 text-lg font-bold px-6">
          المبنى:
        </label>
        {isLoading ? (
          <p>جاري التحميل...</p>
        ) : error ? (
          <p>حدث خطأ أثناء جلب البيانات</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {buildings.buildingList.map((building) => (
              <Button
                key={building.id}
                type="button"
                onClick={() => handleRoleChange(building.id.toString())}
                className={`w-44 h-10 hover:bg-primary-700 hover:text-white ${
                  formData.buildingID.value === building.id.toString()
                    ? "bg-secondary text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {building.name_building}
              </Button>
            ))}
          </div>
        )}
      </div>

      <form className="grid grid-cols-2 gap-10 py-6">
        <ValidateInput
          inputName="RoomNo"
          labelName="رقم الغرفة:"
          onChange={handleChange}
          value={formData.RoomNo.value}
          type="text"
          isValaid={(isVaild) =>
            setFormData((prev) => ({
              ...prev,
              RoomNo: { ...prev.RoomNo, isVaild },
            }))
          }
        />

        <ValidateInput
          inputName="MaxResidents"
          labelName="حجم الغرفة:"
          onChange={handleChange}
          value={formData.MaxResidents.value}
          type="text"
          isValaid={(isVaild) =>
            setFormData((prev) => ({
              ...prev,
              MaxResidents: { ...prev.MaxResidents, isVaild },
            }))
          }
        />
        <ValidateInput
          inputName="FloorNo"
          labelName="طابق الغرفة:"
          onChange={handleChange}
          value={formData.FloorNo.value}
          type="text"
          isValaid={(isVaild) =>
            setFormData((prev) => ({
              ...prev,
              FloorNo: { ...prev.FloorNo, isVaild },
            }))
          }
        />
      </form>

      <div
        className={`bg-primary-700 text-white px-6 py-2 text-center rounded-md hover:bg-primary-600 w-80 cursor-pointer mx-auto`}
        onClick={validateInputs}
      >
        <span>أضف الغرفة</span>
      </div>

      <GeneralDailog
        clasName="mt-4"
        dialogTitle="هل أنت متأكد أنك تريد إضافة هذه الغرفة؟"
        description="قد لا تتمكن من التراجع بعد إتمامها"
        onConfirm={handleSubmit}
        onOpenChange={(isOpen) => setIsOpen(isOpen)}
        isOpen={isOpen}
      />
    </div>
  );
};

export default AddRoomTab;
