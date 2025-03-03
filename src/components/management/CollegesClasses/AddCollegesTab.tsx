"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GeneralDailog from "@/components/ui/GeneralDailog";
import { postAddFaculties } from "@/lib/fetsures/management/action";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import DailogLoading from "@/components/ui/DailogLoading";
import { useState } from "react";
import {
  FacultyFormData,
  FacultySchema,
} from "@/validation/managements/collageAndClasses";
import { FormField } from "@/components/ui";

function FacultityManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.mangement);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    getValues,
  } = useForm<FacultyFormData>({
    resolver: zodResolver(FacultySchema),
    defaultValues: {
      name: "",
      semCount: "",
      image: undefined,
    },
  });

  const imageFile = watch("image");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue("image", e.target.files[0]);
    }
  };

  const onSubmit = async () => setIsOpen(true);

  const handleConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const data = getValues();
      const formDataToSend = {
        name: data.name,
        semCount: Number(data.semCount),
        image: data.image,
      };

      await dispatch(postAddFaculties(formDataToSend));
      toast.success("تمت إضافة الكلية بنجاح!");
      reset();
      setIsOpen(false);
    } catch {}
    setIsOpen(false);
  };

  return (
    <div className="py-10 text-right">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-x-8">
          <FormField
            label="اسم الكلية"
            type="text"
            placeholder="أدخل اسم الكلية"
            name="name"
            register={register}
            error={errors.name}
          />
          <FormField
            label="عدد الفصول الدراسية"
            type="text"
            placeholder="أدخل عدد الفصول الدراسية"
            name="semCount"
            register={register}
            error={errors.semCount}
          />
        </div>
        <div className="flex items-center gap-x-4 mt-8">
          <label htmlFor="image" className="font-bold">
            قم بإضافة شعار الكلية:
          </label>
          <div className="w-72 h-20">
            <label
              htmlFor="image"
              className="w-full h-full flex items-center p-2 text-center justify-center cursor-pointer bg-gray-100 rounded-md hover:bg-gray-300 border border-secondary text-secondary font-bold"
            >
              {imageFile && imageFile.name
                ? imageFile.name
                : "تحميل"}
            </label>
            <Input
              id="image"
              type="file"
              {...register("image")}
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="mt-2 text-xs text-danger text-left">
              {errors.image && errors.image.message}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <Button
            type="submit"
            className="bg-secondary text-white px-16 text-lg py-2 rounded hover:bg-secondary-600"
          >
            أضف الكلية
          </Button>
        </div>
      </form>
      <GeneralDailog
        dialogTitle="هل أنت متأكد أنك تريد إضافة هذه الكلية؟"
        description="قد لا تتمكن من التراجع بعد إتمامها"
        onConfirm={handleConfirm}
        onOpenChange={(isOpen) => setIsOpen(isOpen)}
        isOpen={isOpen}
      />
      {status === "loading" && <DailogLoading />}
    </div>
  );
}

export default FacultityManagement;
