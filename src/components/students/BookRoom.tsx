// BookRoom.tsx
"use client";

import React, { useState } from "react";
import TitleSection from "@/components/students/ui/title-section";
import RoomsForm from "./ui/RoomsForm";
import FormDialog from "@/components/ui/GeneralDialog";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux-toolkit";
import {
  BookRoom as postBookRoom,
  fetchBuildings,
} from "@/lib/fetsures/students/action";
import DailogLoading from "../ui/DailogLoading";

const BookRoom = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    building: "",
    floor: "",
    roomId: "",
  });
  const dispatch = useAppDispatch();
  const [reSetData, setreSetData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validateForm = () => {
    if (
      !formData.studentId.trim() ||
      !formData.roomId.trim() ||
      formData.roomId === "none"
    ) {
      toast.error("يرجى إدخال رقم الملف ورقم الغرفة");
      return false;
    }
    return true;
  };

  const handleConfirmBooking = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(
        postBookRoom({
          id: parseInt(formData.studentId),
          roomId: formData.roomId,
        })
      ).unwrap();
      toast.success("تم الحجز بنجاح");
    } catch {}
    setIsLoading(false);
    setIsDialogOpen(false);
    setFormData({ studentId: "", building: "", floor: "", roomId: "" });
    setreSetData(true);
    setTimeout(() => setreSetData(false), 0);
    await dispatch(fetchBuildings());
  };

  const handleFormDataChange = (updatedData: typeof formData) => {
    setFormData(updatedData);
  };

  return (
    <div className="container ">
      {isLoading && <DailogLoading />}

      <TitleSection
        title="حجز غرفة لطالب"
        className="text-3xl font-semibold text-[#1A3D61] mr-[400px]"
      />

      <div className="bg-white rounded-lg py-4 shadow-lg mt-4">
        <RoomsForm
          formData={formData}
          onFormDataChange={handleFormDataChange}
          resetInputField={reSetData}
        />

        <div className="flex justify-center mt-8 mb-[34px]">
          <button
            onClick={() => validateForm() && setIsDialogOpen(true)}
            className="bg-primary-700 text-white px-8 py-1 rounded-[9px] hover:bg-primary-800 transition-all text-lg font-semibold"
          >
            تأكيد حجز الغرفة
          </button>
        </div>
      </div>

      <FormDialog
        isOpen={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
        dialogTitle="تأكيد العملية"
        description="هل أنت متأكد من رغبتك في إتمام عملية الحجز؟"
        confirmText="تأكيد"
        cancelText="إلغاء"
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
};

export default BookRoom;
