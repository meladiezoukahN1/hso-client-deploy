"use client";

import React, { useState } from "react";
import TitleSection from "@/components/students/ui/title-section";
import RoomsForm from "./ui/RoomsForm";
import FormDialog from "@/components/ui/GeneralDialog";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { MoveStudent, SwitchRoomStudent } from "@/lib/fetsures/students/action";
import SelectValueComponents from "../ui/SelectValue";
import DailogLoading from "../ui/DailogLoading";

const EditRoom = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    building: "",
    floor: "",
    roomId: "",
  });
  const dispatch = useAppDispatch();
  const { editRooms } = useAppSelector((state) => state.student);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenSecond, setIsDialogOpenSecond] = useState(false);
  const [fileNumber, setfileNumber] = useState("");
  const [reSetData, setreSetData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    if (!formData.studentId.trim() || !formData.roomId.trim()) {
      toast.error("يرجى إدخال رقم الملف ورقم الغرفة");
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleConfirmEdit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(
      MoveStudent({
        fileNo: parseInt(formData.studentId),
        roomID: parseInt(formData.roomId),
      })
    );
    setFormData({
      studentId: "",
      building: "",
      floor: "",
      roomId: "",
    });
    setIsLoading(false);
    setIsDialogOpen(false);
    setreSetData(true);
    setTimeout(() => setreSetData(false), 0);
  };

  const handleConfirmEditSecond = async (e: React.MouseEvent<HTMLElement>) => {
    setIsLoading(true);
    e.preventDefault();
    await dispatch(
      SwitchRoomStudent({
        id: parseInt(formData.studentId),
        fileNo: parseInt(fileNumber),
      })
    );
    setIsLoading(false);
    setIsDialogOpen(false);
    setreSetData(true);
    setTimeout(() => setreSetData(false), 0);
  };

  const handleFormDataChange = (updatedData: typeof formData) => {
    setFormData(updatedData);
  };

  const handelStatus = (value: string) => {
    setfileNumber(value);
  };

  return (
    <>
      {isLoading && <DailogLoading />}

      <TitleSection
        title="تعديل الغرف"
        className="text-[#1A3D61] mt-5 mr-[400px] mb-4"
      />  
      <RoomsForm
        formData={formData}
        onFormDataChange={handleFormDataChange}
        resetInputField={reSetData}
      />

      <div className="text-center p-6">
        <button
          onClick={handleEditClick}
          className="bg-secondary text-white px-10 py-2 rounded-lg hover:bg-primary-600 transition-all text-base font-semibold"
        >
          تعديل الغرفة
        </button>
      </div>

      <FormDialog
        isOpen={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
        dialogTitle="تأكيد التعديل"
        description="هل تريد تأكيد تعديل بيانات الغرفة؟"
        confirmText="تأكيد التعديل"
        onConfirm={handleConfirmEdit}
      />

      <FormDialog
        isOpen={isDialogOpenSecond}
        onOpenChange={() => setIsDialogOpenSecond(false)}
        dialogTitle="نقل طالب"
        description="حاليا الغرفة ممتلئة في حالة كنت تريد تبديل الغرف مع احد الطلبة الرجاء اختيار الطالب الذي تريد نقله؟"
        onConfirm={handleConfirmEditSecond}
      >
        <SelectValueComponents
          title=""
          data={Array.isArray(editRooms.data) ? editRooms.data : []}
          onValueChange={handelStatus}
        />
      </FormDialog>

      <ToastContainer position="bottom-left" limit={2} autoClose={1000} />
    </>
  );
};

export default EditRoom;
