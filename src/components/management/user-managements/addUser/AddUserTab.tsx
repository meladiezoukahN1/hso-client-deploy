"use client";

import React, { useState } from "react";
import InputFields from "./InputFields";
import GeneralDailog from "@/components/ui/GeneralDailog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { createAccount, getUsers } from "@/lib/fetsures/management/action";
import DailogLoading from "@/components/ui/DailogLoading";
import { useForm } from "react-hook-form";
import { AddUserType, AddUserSchema } from "@/validation/managements/user";
import { Button } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddUser() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.mangement);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<AddUserType>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      role: "موظف",
    },
  });

  const handleRoleChange = (role: string) => {
    setValue("role", role);
  };

  const handleConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const formData = getValues();
      await dispatch(createAccount(formData)).unwrap();
      await dispatch(getUsers()).unwrap();
      reset();
    } catch {
    } finally {
      setIsOpen(false);
    }
  };

  const onSubmit = async () => setIsOpen(true);

  return (
    <div className="px-7 py-3">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <InputFields
            register={register}
            errors={errors}
            role={watch("role")}
            handleRoleChange={handleRoleChange}
          />
        </div>
        <div className="flex justify-centerx ">
          <Button
            type="submit"
            className="bg-primary-700 mx-auto w-60 hover:bg-primary-600 mt-6"
          >
            اضف مستخدم
          </Button>
        </div>
      </form>
      <GeneralDailog
        dialogTitle="هل أنت متأكد أنك تريد إضافة هذا المستخدم؟"
        description="قد لا تتمكن من التراجع بعد إتمامها"
        onConfirm={handleConfirm}
        onOpenChange={setIsOpen}
        isOpen={isOpen}
      />
      {status === "loading" && <DailogLoading />}
    </div>
  );
}
