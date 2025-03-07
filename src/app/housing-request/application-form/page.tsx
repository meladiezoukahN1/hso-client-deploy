"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Header from "@/components/landing/ui/Header";
import Footer from "@/components/landing/ui/footer";
import GeneralDialog from "@/components/ui/GeneralDialog";
import InputForm from "./ui/inputForm";
import SelectForm from "./ui/selectForm";
import FileInputFormComponent from "./ui/fileInputForm";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { Collage as getCollage, cities } from "@/lib/fetsures/students/action";
import { genderSelect, NationalitySelect } from "@/lib/jsons/landing-page";
import {
  ApplicationSchema,
  ApplicationFormValues,
} from "@/validation/landing/landing";
import { DailogLoading } from "@/components/ui";

const ApplicationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const { collage, city } = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      birthCertificate: undefined,
      residencyProof: undefined,
      personalPhotos: undefined,
      secondaryCertificate: undefined,
    },
  });

  useEffect(() => {
    dispatch(getCollage());
    dispatch(cities());
  }, [dispatch]);

  const Collage = collage.map((ele) => ({
    label: ele.value,
    value: ele.label,
  }));

  const handleSelectValueChange = (
    field: keyof ApplicationFormValues,
    value: string
  ) => {
    setValue(field, value);
  };

  const onSubmit = async () => {
    setIsDialogOpen(true);
  };

  const handleConfirmSend = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/pending-requests`,
        {
          ...watch(),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("تم إرسال الطلب بنجاح!");
        reset({
          birthCertificate: undefined,
          residencyProof: undefined,
          personalPhotos: undefined,
          secondaryCertificate: undefined,
          city: "",
          gender: "",
          nationality: "",
          studentID: "",
          DOB: "",
          Email: "",
          faculty: "",
          FirstName: "",
          MidName: "",
          LastName: "",
          NatNo: "",
          Phone: "",
        });
        setResetKey((prev) => prev + 1);
      } else {
        throw new Error(`فشل في إرسال الطلب. الحالة: ${response.status}`);
      }
    } catch (error: any) {
      const errorData = error?.response?.data?.errors;
      if (errorData) {
        const messages = Object.values(errorData).flat().join(" ");
        toast.error(messages);
      } else {
        toast.error("حدث خطأ أثناء إرسال الطلب.");
      }
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Header />
      {isLoading && <DailogLoading />}

      <div className="bg-primary-600 flex flex-col md:pr-40 justify-center border-t-4 border-yellow-400">
        <h1 className="md:text-2xl font-bold text-white text-right p-1 md:py-2">
          <span className="border-yellow-400 border-b-2 h-full p-1 md:py-2">
            تقديم طلب لإسكان
          </span>
        </h1>
      </div>

      <div className="bg-gray-100 min-h-screen flex justify-center items-center md:p-4 p-1">
        <div className="max-w-6xl w-full bg-white shadow-lg rounded-md md:p-8 p-1 border border-[#00007F]">
          <div className="text-center mb-6">
            <div className="bg-primary-600 p-4 rounded-md">
              <p className="md:text-2xl font-bold text-white text-right">
                يرجى تعبئة جميع البيانات والتأكد من صحتها.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm register={register} errors={errors} />{" "}
            <SelectForm
              dataCollage={Collage}
              dataGender={genderSelect}
              dataNationality={NationalitySelect}
              datacity={city}
              handleSelectValueChange={handleSelectValueChange}
              errors={errors}
              resetKey={resetKey} // تمرير المفتاح
            />
            <FileInputFormComponent
              errors={errors}
              register={register}
              setValue={setValue}
              resetKey={resetKey} // تمرير المفتاح
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white px-20 py-2 rounded-md hover:bg-primary transition duration-300"
              >
                إرسال
              </button>
            </div>
          </form>
        </div>
      </div>

      <GeneralDialog
        isOpen={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
        dialogTitle="تأكيد الطلب"
        description="هل أنت متاكد من أنك تريد ارسال الطلب؟"
        confirmText="تأكيد الإرسال"
        onConfirm={handleConfirmSend}
      />
      <Footer />
    </>
  );
};

export default ApplicationForm;
