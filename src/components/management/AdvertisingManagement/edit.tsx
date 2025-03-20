"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, Alert, TextInput, Label } from "flowbite-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { advertisements } from "@/lib/fetsures/landing/action";
import GeneralTable from "@/components/ui/GeneralTable";
import PaginationComponent from "@/components/ui/paginationComponent";
import { Advertisements } from "landing";
import { deleteAds, updateAd } from "@/lib/fetsures/management/action";
import { DailogLoading, GeneralDailog } from "@/components/ui";
import { toast } from "sonner";

interface AdFormData {
  title: string;
  details: string;
  image: FileList;
}

export default function AdsDashboard() {
  const dispatch = useAppDispatch();
  const { advertisement, loading } = useAppSelector((state) => state.landing);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentAd, setCurrentAd] = useState<Advertisements | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const { register, handleSubmit, reset } = useForm<AdFormData>();
  const [preview, setPreview] = useState<string | null>(null);
  // متغير لتخزين الملف مباشرة
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    dispatch(advertisements());
  }, [dispatch]);


  // حذف فردي
  const handleSingleDelete = (adId: number) => {
    setCurrentAd(advertisement?.find((ad) => ad.id === adId) || null);
    setIsOpen(true);
  };

  // تأكيد الحذف الفردي
  const confirmSingleDelete = async () => {
    if (!currentAd?.id) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteAds(currentAd.id)).unwrap();
      await dispatch(advertisements());
    } catch {
      toast.error("حدث خطأ أثناء الحذف");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  // فتح نافذة التعديل
  const handleEdit = (ad: Advertisements) => {
    setCurrentAd(ad);
    // نعرض معاينة الصورة باستخدام الرابط الخاص بالسيرفر
    setPreview(`${process.env.NEXT_PUBLIC_API_URL}/${ad.image}`);
    // إعادة ضبط النموذج باستخدام بيانات الإعلان الحالي
    reset({
      title: ad.title,
      details: ad.details,
    });
    setSelectedFile(null);
    setOpenEditModal(true);
  };

  // عند حفظ التعديلات
  const onSubmit = async (data: AdFormData) => {
    if (currentAd && selectedFile) {
      try {
        const updatedAd = {
          id: currentAd.id,
          title: data.title,
          details: data.details,
          image: selectedFile,
        };
        console.log(updatedAd);
        await dispatch(updateAd(updatedAd)).unwrap();
        await dispatch(advertisements());
        setOpenEditModal(false);
      } catch {}
    }
  };

  // معالجة تحميل الصورة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  // بيانات الجدول
  const adsData: Advertisements[] = advertisement || [];
  const currentItems = adsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(adsData.length / itemsPerPage);

  const columns = [
    { header: "اسم الإعلان", accessor: "title" },
    { header: "التفاصيل", accessor: "details" },
    { header: "الصورة", accessor: "image" },
    { header: "تعديل", accessor: "actions" },
    { header: "حذف", accessor: "delete" },
  ];

  const renderCell = (row: Advertisements, column: string) => {
    switch (column) {
      case "image":
        return (
          <div className="flex justify-center my-1">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/${row.image}`}
              alt={row.title}
              className="w-20 h-16 object-cover rounded"
            />
          </div>
        );
      case "actions":
        return (
          <div className="flex justify-center">
            <Button
              onClick={() => handleEdit(row)}
              className="px-2 mx-1 py-1 md:px-4 md:py-2 bg-primary-500 hover:bg-primary-600 text-white"
              size="xs"
            >
              تعديل
            </Button>
          </div>
        );
      case "delete":
        return (
          <div className="flex justify-center">
            <Button
              onClick={() => handleSingleDelete(row.id)}
              className="px-2 mx-1 py-1 md:px-4 md:py-2 bg-danger-500 hover:bg-danger-600 text-white"
              size="xs"
            >
              حذف
            </Button>
          </div>
        );
      default:
        return row[column as keyof Advertisements];
    }
  };

  console.log(currentItems);

  return (
    <div className="font-bold mt-10 px-2 md:px-10">
      {/* تنبيه اختيار الإعلانات */}
      {showAlert && (
        <Alert color="warning" onDismiss={() => setShowAlert(false)}>
          <span>يرجى تحديد إعلانات للحذف.</span>
        </Alert>
      )}

      {/* الجدول الرئيسي */}
      {!loading ? (
        <>
          <div dir="rtl" className="md:mx-10">
            <GeneralTable
              columns={columns}
              data={currentItems}
              classNameTH="p-0"
              renderCell={renderCell}
            />
          </div>
          <div className="mt-4">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="h-96 flex justify-center items-center">Loading...</div>
      )}

      {/* نافذة التعديل */}
      <Modal
        show={openEditModal}
        onClose={() => setOpenEditModal(false)}
        size="lg"
      >
        <Modal.Header>تعديل الإعلان</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title" value="اسم الإعلان" />
              <TextInput
                id="title"
                {...register("title", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="details" value="التفاصيل" />
              <TextInput
                id="details"
                {...register("details", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="image" value="تحميل صورة" />
              <TextInput
                id="image"
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              {preview && (
                <div className="mt-2">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={150}
                    height={100}
                    className="rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <Button type="submit" color="primary">
                حفظ التعديلات
              </Button>
              <Button onClick={() => setOpenEditModal(false)} color="failure">
                إلغاء
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* نافذة تأكيد الحذف الفردي */}
      <GeneralDailog
        dialogTitle={`هل أنت متأكد من حذف ${
          currentAd?.title || "هذا الإعلان"
        }؟`}
        description="سيتم حذف الإعلان بشكل نهائي ولا يمكن استرجاعه"
        onConfirm={confirmSingleDelete}
        onOpenChange={setIsOpen}
        isOpen={isOpen}
      />

      {/* مؤشر التحميل */}
      {(loading || isDeleting) && <DailogLoading />}
    </div>
  );
}
