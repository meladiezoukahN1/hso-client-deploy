"use client";

import React, { useState, ChangeEvent } from "react";
import { FormField } from "./ui/FormField";
import SelectionButton from "./ui/SelectionButton";
import TitleSection from "@/components/students/ui/title-section";
import GeneralDialog from "@/components/ui/GeneralDialog";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux-toolkit";
import { ExpelStudent, getStudent } from "@/lib/fetsures/students/action";
import { ExelStuden } from "student";
import { useRouter } from "next/navigation";
import DailogLoading from "../ui/DailogLoading";

const EXPEL_TYPES = [
  { value: 1, label: "مستنفد" },
  { value: 2, label: "طرد" },
  { value: 3, label: "منقطع" },
];

const ExpelForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [textArea, setTextArea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileNames, setFileNames] = useState("");
  const [fileUploads, setFileUploads] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<ExelStuden>({
    fileNo: 0,
    type: 0,
    reason: "",
    file: {
      lastModified: 0,
      name: "",
      size: 0,
      type: "",
      webkitRelativePath: "",
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const maxSize = 2 * 1024 * 1024;

      if (file.type !== "application/pdf") {
        toast.error("يمكنك فقط تحميل ملفات بصيغة PDF");
        return;
      }

      if (file.size > maxSize) {
        toast.error("حجم الملف يجب ألا يتجاوز 2 ميجا بايت");
        return;
      }

      setFileUploads(file);
      setFileNames(file.name);
    }
  };

  const handleExpelClick = () => {
    if (!parseInt(studentId)) {
      toast.error("يرجى إدخال رقم ملف الطالب");
      return;
    }
    if (!fileNames.trim()) {
      toast.error("يرجى ارفاق قرار الفصل");
      return;
    }
    if (!selectedType) {
      toast.error("يرجى اختيار نوع الإجراء");
      return;
    }
    if (!textArea.trim()) {
      toast.error("يرجى إدخال سبب إلغاء تسجيل الطالب");
      return;
    }

    setPreviewData({
      fileNo: parseInt(studentId),
      type: selectedType,
      reason: textArea,
      file: fileUploads,
    });
    setIsDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const handleConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(ExpelStudent(previewData));
    setIsLoading(false);
    setIsDialogOpen(false);
    setStudentId("");
    setTextArea("");
    setFileNames("");
    setFileUploads(null);
    setSelectedType(0);
    setPreviewData({
      fileNo: 0,
      reason: "",
      type: 0,
      file: {
        lastModified: 0,
        name: "",
        size: 0,
        type: "",
        webkitRelativePath: "",
      },
    });
    await dispatch(getStudent());
    router.refresh();
  };

  return (
    <div className="bg-white shadow-sm mt-5">
      {isLoading && <DailogLoading />}
      <TitleSection
        title="إلغاء تسجيل طالب"
        className=" mr-[450px] text-[#1A3D61]"
      />

      <div dir="rtl" className="space-y-8 p-11 ">
        <div className="rounded-lg ">
          <FormField label="رقم ملف الطالب :" classLabel="w-36 font-semibold">
            <Input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="أدخل رقم ملف الطالب"
              className="w-80 bg-white border-[#1A3D61]"
            />
          </FormField>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <label className="text-lg font-semibold w-32">قرار الفصل :</label>
          <label className="inline-flex items-center gap-3 cursor-pointer border border-[#1A3D61] px-2 py-2 rounded-md hover:bg-gray-100 transition">
            <span className="text-gray-600 w-80 text-center font-bold">
              {fileNames || "أرفق ملف"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="application/pdf"
            />
          </label>
          <div className="rounded-lg mr-8">
            <FormField label="نوع الإجراء :" classLabel="w-28">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {EXPEL_TYPES.map((type) => (
                  <SelectionButton
                    key={type.value}
                    selected={selectedType === type.value}
                    onClick={() => setSelectedType(type.value)}
                    className="w-full py-3"
                  >
                    {type.label}
                  </SelectionButton>
                ))}
              </div>
            </FormField>
          </div>
        </div>

        <div className=" p-6 rounded-lg ">
          <h3 className="text-lg font-semibold mb-4">سبب إلغاء التسجيل :</h3>
          <textarea
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
            placeholder="من فضلك قم بإدراج سبب إلغاء تسجيل الطالب"
            className="w-full p-3 bg-white border-[#1A3D61] rounded-md h-32"
          />
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleExpelClick}
            className="bg-[#1A3D61] text-white px-12 py-3 rounded-[9px] hover:bg-[#1A3D61]/90 transition-all text-[20px] font-semibold"
          >
            إلغاء تسجيل طالب{" "}
          </button>
        </div>
      </div>

      <GeneralDialog
        dialogTitle="إلغاء تسجيل طالب"
        description={`هل أنت متأكد أنك تريد إلغاء تسجيل الطالب صاحب رقم الملف ${studentId} ؟
قد لا تتمكن من التراجع بعد إتمامها`}
        isOpen={isDialogOpen}
        dialogDetails="هذا الإجراء نهائي ولا يمكن التراجع عنه!"
        confirmText="تأكيد"
        cancelText="إلغاء"
        onOpenChange={handleDialogClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ExpelForm;
