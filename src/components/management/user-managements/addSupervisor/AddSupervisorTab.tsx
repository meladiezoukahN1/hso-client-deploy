"use client";

import { useState } from "react";
import GeneralDailog from "@/components/ui/GeneralDailog";
import InputFields from "./InputFields";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { addSupervisor } from "@/lib/fetsures/management/action";
import {
  AddSupervisorSchema,
  AddSupervisorType,
} from "@/validation/managements/supervisor";
import DailogLoading from "@/components/ui/DailogLoading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui";

export default function AddSupervisorTab() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.mangement);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<AddSupervisorType>({
    resolver: zodResolver(AddSupervisorSchema),
  });

  const handleConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const formData = getValues();
      await dispatch(addSupervisor(formData)).unwrap();
      reset();
    } catch {
    } finally {
      setIsOpen(false);
    }
  };

  const onSubmit = async () => setIsOpen(true);

  return (
    <div className="p-7">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <InputFields register={register} errors={errors} />
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-primary-700 mx-auto w-60 hover:bg-primary-600 mt-6"
          >
            أضف المشرف
          </Button>
        </div>
      </form>
      <GeneralDailog
        dialogTitle="هل أنت متأكد أنك تريد إضافة هذا المشرف؟"
        description="قد لا تتمكن من التراجع بعد إتمامها"
        onConfirm={handleConfirm}
        onOpenChange={setIsOpen}
        isOpen={isOpen}
      />
      {status === "loading" && <DailogLoading />}
    </div>
  );
}
