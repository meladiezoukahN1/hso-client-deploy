"use client";

import React, { useEffect, useState } from "react";
import SelectionButton from "./SelectionButton";
import { FormField } from "./FormField";
import SelectValueComponents from "../../ui/SelectValue";
import { useAppSelector, useAppDispatch } from "@/hooks/redux-toolkit";
import { fetchBuildings } from "@/lib/fetsures/students/action";
import LoadingIcon from "@/components/ui/LoadingIcon";
import { Input } from "@/components/ui/input";

interface RoomsFormProps {
  formData: {
    studentId: string;
    building: string;
    floor: string;
    roomId: string;
  };
  onFormDataChange: (data: RoomsFormProps["formData"]) => void;
  resetInputField: boolean;
}

const RoomsForm: React.FC<RoomsFormProps> = ({
  formData,
  onFormDataChange,
  resetInputField,
}) => {
  const [userID, setUserId] = useState("");
  const dispatch = useAppDispatch();
  const {
    student,
    buildings = {} as Record<
      string,
      {
        Name: string;
        FloorsData: {
          FloorNo: number;
          Rooms: { Room_id: number; RoomNo: string }[];
        }[];
      }
    >,
    loading,
  } = useAppSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchBuildings());
  }, [dispatch]);

  const updateFormData = React.useCallback(
    (field: keyof typeof formData, value: string) => {
      onFormDataChange({ ...formData, [field]: value });
    },
    [formData, onFormDataChange]
  );

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserId(value);
    const foundStudent = student.find(
      (s) => s.fileNo === parseInt(value) && s.status === "Active"
    );
    updateFormData("studentId", foundStudent ? value : "");
  };

  useEffect(() => {
    if (resetInputField) {
      setUserId("");
      updateFormData("studentId", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetInputField]);

  const buildingsArray = Object.values(buildings || {});
  const selectedBuilding = buildingsArray.find(
    (b) => b.Name === formData.building
  );
  const availableFloors =
    selectedBuilding?.FloorsData?.map((f) => f.FloorNo) || [];
  const availableRooms =
    selectedBuilding?.FloorsData?.find(
      (f) => f.FloorNo === Number(formData.floor)
    )?.Rooms || [];

  const selectedStudent = student.find(
    (s) => s.fileNo === parseInt(formData.studentId)
  );

  return (
    <div dir="rtl" className="space-y-6">
      {/* Student ID Input */}
      <div className="bg-gray-50 p-2 rounded-md">
        <FormField label="رقم ملف الطالب" classLabel=" ml-10 font-bold">
          <Input
            value={userID}
            onChange={handleStudentIdChange}
            placeholder="أدخل رقم الملف"
            className="w-full max-w-xs border-2  border-gray-300 ring-0 outline-0 focus:ring-0 hover:ring-0 "
          />
        </FormField>

        {formData.studentId && (
          <div className="bg-gray-100 p-2 rounded-md mt-4">
            <h2 className="text-base font-bold text-primary mb-2 border-b pb-2">
              معلومات الطالب
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center">
                <span className="font-semibold min-w-[100px]">رقم الملف:</span>
                <span>{formData.studentId}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold min-w-[100px]">الاسم:</span>
                <span>{selectedStudent?.full_name || "---"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold min-w-[100px]">الحالة:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    selectedStudent?.status === "Active"
                      ? "bg-green-400 text-green-900"
                      : "bg-red-400 text-red-900"
                  }`}
                >
                  {selectedStudent?.status === "Active" ? "موجود" : "غير مسجل"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <LoadingIcon ClassName="h-48" />
      ) : (
        <>
          {/* Building Selection */}
          <div className="bg-gray-50 p-2 rounded-md">
            <h3 className="font-bold text-base mb-4">اختر المبنى</h3>
            <div className="flex flex-wrap gap-3">
              {buildingsArray.map((building) => (
                <SelectionButton
                  key={building.Name}
                  selected={formData.building === building.Name}
                  onClick={() => updateFormData("building", building.Name)}
                >
                  {building.Name}
                </SelectionButton>
              ))}
            </div>
          </div>

          {/* Floor Selection */}
          {formData.building && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold text-lg mb-4">اختر الدور</h3>
              <div className="flex flex-wrap gap-3">
                {availableFloors.map((floor) => (
                  <SelectionButton
                    key={floor}
                    selected={formData.floor === floor.toString()}
                    onClick={() => updateFormData("floor", floor.toString())}
                  >
                    الدور {floor}
                  </SelectionButton>
                ))}
              </div>
            </div>
          )}

          {/* Room Selection */}
          {formData.floor && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold text-lg mb-4">الغرف المتاحة</h3>
              <SelectValueComponents
                title="اختر رقم الغرفة"
                data={availableRooms.map((room) => ({
                  value: room.Room_id.toString(),
                  label: room.RoomNo,
                }))}
                onValueChange={(value) => updateFormData("roomId", value)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RoomsForm;
