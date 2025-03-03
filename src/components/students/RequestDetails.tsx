"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BackButton from "../ui/BackButton";
import TitleSection from "@/components/students/ui/title-section";
import Link from "next/link";
import GeneralDialog from "@/components/ui/GeneralDialog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  PendingRequest,
  ApproveRequest,
  RejectRequest,
  PendingRequests,
} from "@/lib/fetsures/students/action";
import { toast } from "sonner";
import { LoadingIcon } from "../ui";

const RequestDetails = () => {
  const router = useRouter();
  const [reason, setReason] = useState<string>("");
  const { id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenSecond, setIsDialogOpenSecond] = useState(false);
  const dispatch = useAppDispatch();
  const { requesteDetails, loading, status } = useAppSelector(
    (state) => state.student
  );

  useEffect(() => {
    if (!id) return;
    const singleId = Array.isArray(id) ? id[0] : id;
    dispatch(PendingRequest(parseInt(singleId)));
  }, [dispatch, id]);

  const handleConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await dispatch(ApproveRequest(requesteDetails[0].ReqID)).unwrap();
      await dispatch(PendingRequests()).unwrap();
      router.push("/students/requests");
    } catch {
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleCancel = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error("الرجاء ادخال السبب");
      return;
    } else {
      await dispatch(RejectRequest({ id: requesteDetails[0].ReqID, reason }));
      await dispatch(PendingRequests());
      setIsDialogOpenSecond(false);
    }
    router.push("/students/requests");
  };

  if (!requesteDetails.length && loading) {
    return <LoadingIcon />;
  }

  if (!requesteDetails.length && !loading) {
    return (
      <div className="min-h-screen w-full justify-center flex items-center">
        لا توجد بيانات للمستخدم حالياً، يرجى المحاولة لاحقاً
      </div>
    );
  }

  return (
    <div>
      {status === "loading" && <LoadingIcon />}
      <BackButton />
      {requesteDetails?.length > 0 && requesteDetails[0]?.ReqID !== 0 && (
        <>
          <TitleSection
            className="mt-9"
            title={`${requesteDetails[0].full_name}`}
          />
          {requesteDetails.map((request, index) => (
            <div dir="rtl" className="md:p-6 p-2 space-y-12" key={index}>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* العمود الأول */}
                <div className="space-y-4">
                  <div className="flex flex-row-reverse items-center gap-2">
                    <input
                      readOnly
                      value={request.studentID}
                      className="w-full p-2 bg-gray-200 focus:outline-0 focus:border-0 focus:ring-0  rounded-md"
                      disabled
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2 w-32">
                      الرقم الوطني :
                    </label>
                  </div>

                  <div className="flex flex-row-reverse items-center gap-2">
                    <input
                      readOnly
                      value={request.studentID}
                      className="w-full p-2 bg-gray-200 focus:outline-0 focus:border-0 focus:ring-0  rounded-md"
                      disabled
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2 w-32">
                      رقم القيد :
                    </label>
                  </div>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <input
                      readOnly
                      value={request.Phone}
                      className="w-full p-2 bg-gray-200 focus:outline-0 focus:border-0 focus:ring-0  rounded-md"
                      disabled
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2 w-32">
                      رقم الهاتف :
                    </label>
                  </div>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <input
                      readOnly
                      value={new Date(request.DOB).toLocaleDateString("ar-EG")}
                      className="w-full p-2 bg-gray-200 focus:outline-0 focus:border-0 focus:ring-0  rounded-md"
                      disabled
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2 w-32">
                      تاريخ الميلاد :
                    </label>
                  </div>
                </div>

                {/* العمود الثاني */}
                <div className="space-y-4">
                  <div className="flex flex-row-reverse items-center gap-2">
                    <input
                      readOnly
                      value={request.Phone}
                      className="w-full p-2 bg-gray-200 focus:outline-0 focus:border-0 focus:ring-0  rounded-md"
                      disabled
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2 w-32">
                      رقم الهاتف :
                    </label>
                  </div>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <input
                      readOnly
                      value={request.nationality}
                      className="w-full p-2 bg-gray-200 focus:outline-0 focus:border-0 focus:ring-0  rounded-md"
                      disabled
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2 w-32">
                      الجنسية :
                    </label>
                  </div>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <input
                      readOnly
                      value={request.faculty}
                      className="w-full p-2 bg-gray-200 focus:outline-0 focus:border-0 focus:ring-0  rounded-md"
                      disabled
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2 w-32">
                      الكلية :
                    </label>
                  </div>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <input
                      readOnly
                      value={request.Email}
                      className="w-full p-2 bg-gray-200 focus:outline-0 focus:border-0 focus:ring-0  rounded-md"
                      disabled
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2 w-32">
                      البريد الإلكتروني :
                    </label>
                  </div>
                </div>

                {requesteDetails.map((request, index) => (
                  <div dir="rtl" className="md:p-4 p-2 space-y-12" key={index}>
                    {/* قسم المستندات */}
                    <div>
                      <h1 className="text-gray-700 mb-4 font-bold text-lg">
                        المستندات الرسمية المحملة:
                      </h1>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                        {/* شهادة الميلاد */}
                        {request.documents.map((doc) =>
                          doc.FileName.includes("birthCertificate") ? (
                            <div
                              key={doc.DocId}
                              className="flex items-center justify-between"
                            >
                              <span className="text-lg text-gray-700 ">
                                شهادة الميلاد:
                              </span>
                              <Link
                                href={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                                target="_blank"
                              >
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                                  عرض الملف
                                </button>
                              </Link>
                            </div>
                          ) : null
                        )}

                        {/* شهادة الإقامة */}
                        {request.documents.map((doc) =>
                          doc.FileName.includes("secondaryCertificate") ? (
                            <div
                              key={doc.DocId}
                              className="flex items-center justify-between"
                            >
                              <span className="text-lg text-gray-700">
                                شهادة الإقامة:
                              </span>
                              <Link
                                href={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                                target="_blank"
                              >
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                                  عرض الملف
                                </button>
                              </Link>
                            </div>
                          ) : null
                        )}

                        {/* الشهادة الثانوية */}
                        {request.documents.map((doc) =>
                          doc.FileName.includes("secondaryCertificate") ? (
                            <div
                              key={doc.DocId}
                              className="flex items-center justify-between"
                            >
                              <span className="text-lg text-gray-700">
                                الشهادة الثانوية:
                              </span>
                              <Link
                                href={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                                target="_blank"
                              >
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                                  عرض الملف
                                </button>
                              </Link>
                            </div>
                          ) : null
                        )}

                        {/* صورة شخصية */}
                        {request.documents.map((doc) =>
                          doc.FileName.includes("personalPhoto") ? (
                            <div
                              key={doc.DocId}
                              className="flex items-center justify-between"
                            >
                              <span className="text-lg text-gray-700">
                                صورة شخصية:
                              </span>
                              <Link
                                href={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                                target="_blank"
                              >
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                                  عرض الملف
                                </button>
                              </Link>
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* أزرار القبول والرفض */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  قبول الطلب
                </button>
                <button
                  onClick={() => setIsDialogOpenSecond(true)}
                  className="bg-red-600 text-white px-8 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  رفض الطلب
                </button>
              </div>

              {/* ديالوجات التأكيد */}
              <GeneralDialog
                dialogTitle="تأكيد القبول"
                description="هل أنت متأكد من قبول هذا الطلب؟"
                isOpen={isDialogOpen}
                onConfirm={handleConfirm}
                onOpenChange={setIsDialogOpen}
              />

              <GeneralDialog
                dialogTitle="تأكيد الرفض"
                description="هل أنت متأكد من رفض هذا الطلب؟"
                isOpen={isDialogOpenSecond}
                onConfirm={handleCancel}
                onOpenChange={setIsDialogOpenSecond}
              >
                <label className="space-y-4 mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    سبب الرفض:
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none focus:ring-2 focus:ring-blue-500"
                    placeholder="أدخل سبب الرفض..."
                    onChange={(e) => setReason(e.target.value)}
                  />
                </label>
              </GeneralDialog>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RequestDetails;
