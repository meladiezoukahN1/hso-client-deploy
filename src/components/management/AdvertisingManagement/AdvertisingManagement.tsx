"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BackButton from "../ui/backbutton";
import GeneralDailog from "@/components/ui/GeneralDailog";
import { useAppDispatch } from "@/hooks/redux-toolkit";
import { postAdvertisement } from "@/lib/fetsures/management/action";
import { FormField } from "@/components/ui";
import { useState } from "react";
import {
  AdvertisementFormData,
  AdvertisementSchema,
} from "@/validation/managements/advertising";

function AdvertisingManagement() {
  const dispatch = useAppDispatch();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<AdvertisementFormData>({
    resolver: zodResolver(AdvertisementSchema),
    defaultValues: {
      advertisementImage: undefined,
    },
  });

  const advertisementImage = watch("advertisementImage");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue("advertisementImage", e.target.files[0]);
    }
  };

  const onSubmit = async (data: AdvertisementFormData) => {
    try {
      const sendData = {
        title: data.advertisementTitle,
        details: data.advertisementDetails,
        image: data.advertisementImage,
        expiration_date: data.expiration_date,
      };

      await dispatch(postAdvertisement(sendData));
      toast.success("تمت إضافة الإعلان بنجاح!");
      reset();
      setIsOpen(false);
    } catch {
      toast.error("حدث خطأ أثناء إضافة الإعلان");
    }
  };

  const handlePreview = () => {
    if (
      !watch("advertisementTitle") ||
      !watch("advertisementDetails") ||
      !advertisementImage
    ) {
      toast.warning("يجب تعبئة جميع الحقول وإضافة صورة");
      return;
    }
    setIsPreviewOpen(true);
  };

  return (
    <div className="text-right">
      <BackButton />
      <h1 className="text-3xl font-bold mr-6 mt-10">إدارة الإعلانات:</h1>
      <form
        className="md:grid md:grid-cols-2 gap-2 p-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          label="اسم الإعلان"
          type="text"
          placeholder="أدخل اسم الإعلان"
          name="advertisementTitle"
          register={register}
          error={errors.advertisementTitle}
          classLabel="w-40"
        />

        <FormField
          label="صلاحية الاعلان"
          type="number"
          placeholder="أدخل اسم الإعلان"
          name="expiration_date"
          register={register}
          error={errors.expiration_date}
          classLabel="w-40"
          valueAsNumber
        />

        <div className="flex items-center">
          <label
            htmlFor="advertisementImage"
            className="w-64 md:w-44 text-lg font-bold"
          >
            صورة الإعلان:
          </label>
          <label
            htmlFor="advertisementImage"
            className="cursor-pointer bg-gray-100 py-2 px-4 rounded-md hover:bg-gray-300 border border-gray-300 w-64 h-10 text-center"
          >
            {advertisementImage && advertisementImage.name
              ? advertisementImage.name
              : "أرفق ملف"}
          </label>
          <Input
            id="advertisementImage"
            type="file"
            {...register("advertisementImage")}
            onChange={handleFileChange}
            className="hidden"
          />
          {errors.advertisementImage && (
            <p className="text-red-500 text-sm">
              {errors.advertisementImage.message}
            </p>
          )}
        </div>

        <div className="flex items-start my-4">
          <label
            htmlFor="advertisementDetails"
            className="w-40 text-base font-bold mt-1"
          >
            تفاصيل الإعلان:
          </label>
          <div className="w-80">
            <textarea
              id="advertisementDetails"
              {...register("advertisementDetails")}
              className="border text-sm border-gray-300 w-full h-28 rounded-md"
            />
            <p className="block text-red-500 text-sm min-h-5">
              {errors.advertisementDetails &&
                errors.advertisementDetails.message}
            </p>
          </div>
        </div>

        <div className="col-span-2 flex justify-center gap-4">
          <Button
            type="submit"
            className="w-40 bg-primary-500 hover:bg-primary-600 text-white"
          >
            إضافة الإعلان
          </Button>
          <Button
            type="button"
            onClick={handlePreview}
            className="w-40 bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            عرض الإعلان
          </Button>
        </div>
      </form>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            {advertisementImage && (
              <div
                className="bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${URL.createObjectURL(
                    advertisementImage
                  )})`,
                  width: "800px",
                  height: "400px",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                  <h2 className="text-2xl font-bold">
                    {watch("advertisementTitle")}
                  </h2>
                  <p className="mt-2 text-lg">
                    {watch("advertisementDetails")}
                  </p>
                </div>
              </div>
            )}
            <Button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="bg-null hover:bg-null absolute top-2 right-2 text-red-500"
            >
              X
            </Button>
          </div>
        </div>
      )}

      <GeneralDailog
        clasName="mt-4"
        dialogTitle="هل أنت متأكد أنك تريد إضافة هذا الإعلان؟"
        description="قد لا تتمكن من التراجع بعد إتمامها"
        onConfirm={handleSubmit(onSubmit)}
        onOpenChange={(isOpen) => setIsOpen(isOpen)}
        isOpen={isOpen}
      />
    </div>
  );
}

export default AdvertisingManagement;
