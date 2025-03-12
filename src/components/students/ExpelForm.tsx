"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { ExpelStudent, getStudent } from "@/lib/fetsures/students/action";
import { ExelStuden } from "student";

import TitleSection from "@/components/students/ui/title-section";
import GeneralDialog from "@/components/ui/GeneralDialog";
import { FormField } from "./ui/FormField";
import SelectionButton from "./ui/SelectionButton";
import DailogLoading from "@/components/ui/DailogLoading";
import { Input } from "@/components/ui/input";

const EXPEL_TYPES = [
  { value: 1, label: "مستنفد" },
  { value: 2, label: "طرد" },
  { value: 3, label: "منقطع" },
];

const ExpelForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { student } = useAppSelector((state) => state.student); // جلب بيانات الطلاب من المخزن

  const [studentId, setStudentId] = useState("");
  const [selectedType, setSelectedType] = useState<number>(0);
  const [textArea, setTextArea] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  // البحث عن الطالب بحسب رقم الملف
  const selectedStudent = student.find((s) => s.fileNo === parseInt(studentId));

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("يمكنك فقط تحميل ملفات بصيغة PDF");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم الملف يجب ألا يتجاوز 2 ميجا بايت");
      return;
    }

    setFileUpload(file);
    setFileName(file.name);
  };

  const handleExpelClick = () => {
    if (!parseInt(studentId)) {
      toast.error("يرجى إدخال رقم ملف الطالب");
      return;
    }
    if (!selectedStudent) {
      toast.error("لم يتم العثور على طالب بهذا الرقم");
      return;
    }
    if (!fileName.trim()) {
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
      file: fileUpload,
    });
    setIsDialogOpen(true);
  };

  const handleConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await dispatch(ExpelStudent(previewData));
    setIsLoading(false);
    setIsDialogOpen(false);

    // إعادة تهيئة الحقول بعد التأكيد
    setStudentId("");
    setTextArea("");
    setFileName("");
    setFileUpload(null);
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
        className="mr-0 md:mr-[450px] text-[#1A3D61]"
      />

      <div dir="rtl" className="space-y-8 p-4 md:p-11">
        <FormField
          label="رقم ملف الطالب :"
          classLabel="w-full md:w-36 font-semibold"
        >
          <Input
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="أدخل رقم ملف الطالب"
            className="w-full md:w-80 bg-white border-[#1A3D61]"
          />
        </FormField>

        {studentId && selectedStudent && (
          <div className="bg-gray-100 p-2 rounded-md mt-4">
            <h2 className="text-base font-bold text-primary mb-2 border-b pb-2">
              معلومات الطالب
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center">
                <span className="font-semibold min-w-[100px]">رقم الملف:</span>
                <span>{selectedStudent.fileNo}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold min-w-[100px]">الاسم:</span>
                <span>{selectedStudent.full_name || "---"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold min-w-[100px]">الحالة:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    selectedStudent.status === "Active"
                      ? "bg-green-400 text-green-900"
                      : "bg-red-400 text-red-900"
                  }`}
                >
                  {selectedStudent.status === "Active" ? "موجود" : "غير مسجل"}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
          <label className="text-lg font-semibold w-full md:w-32">
            قرار الفصل :
          </label>
          <label className="inline-flex items-center gap-3 cursor-pointer border border-[#1A3D61] px-2 py-2 rounded-md hover:bg-gray-100 transition w-full md:w-auto">
            <span className="text-gray-600 w-full md:w-80 text-center font-bold">
              {fileName || "أرفق ملف"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="application/pdf"
            />
          </label>

          <FormField
            label="نوع الإجراء :"
            classLabel="w-full md:w-28"
            className="flex flex-col md:flex-row md:items-center"
          >
            <div className="grid grid-cols-3 gap-4 w-full mt-2 md:mt-0">
              {EXPEL_TYPES.map((type) => (
                <SelectionButton
                  key={type.value}
                  selected={selectedType === type.value}
                  onClick={() => setSelectedType(type.value)}
                  className="w-full md:w-32 py-3"
                >
                  {type.label}
                </SelectionButton>
              ))}
            </div>
          </FormField>
        </div>

        <div className="p-6 rounded-lg">
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
            className="bg-[#1A3D61] text-white px-2 mx-10 md:mx-0 md:px-12 py-3 rounded-[9px] hover:bg-[#1A3D61]/90 transition-all text-sm md:text-sm font-semibold w-full md:w-auto"
          >
            إلغاء تسجيل طالب
          </button>
        </div>
      </div>

      <GeneralDialog
        dialogTitle="إلغاء تسجيل طالب"
        description={`هل أنت متأكد أنك تريد إلغاء تسجيل الطالب صاحب رقم الملف ${studentId}؟ قد لا تتمكن من التراجع بعد إتمامها`}
        isOpen={isDialogOpen}
        dialogDetails="هذا الإجراء نهائي ولا يمكن التراجع عنه!"
        confirmText="تأكيد"
        cancelText="إلغاء"
        onOpenChange={setIsDialogOpen}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ExpelForm;
