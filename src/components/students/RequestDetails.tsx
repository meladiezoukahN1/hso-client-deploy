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
  const { requesteDetails, loading, status,  } = useAppSelector(
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
      <div className="min-h-screen w-full flex justify-center items-center text-center p-4">
        لا توجد بيانات للمستخدم حالياً، يرجى المحاولة لاحقاً
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {status === "loading" && <LoadingIcon />}
      <BackButton />

      {requesteDetails?.length > 0 && requesteDetails[0]?.ReqID !== 0 && (
        <>
          <TitleSection
            className="mt-4 md:mt-6 text-center"
            title={requesteDetails[0].full_name}
          />

          {requesteDetails.map((request, index) => (
            <div
              dir="rtl"
              className="p-2 md:p-6 space-y-4 md:space-y-6"
              key={index}
            >
              {/* Grid Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* Column 1 */}
                <div className="space-y-3 md:space-y-4">
                  {[
                    { label: "الرقم الوطني", value: request.studentID },
                    { label: "رقم القيد", value: request.studentID },
                    { label: "رقم الهاتف", value: request.Phone },
                    {
                      label: "تاريخ الميلاد",
                      value: new Date(request.DOB).toLocaleDateString("ar-EG"),
                    },
                  ].map(({ label, value }, i) => (
                    <div
                      key={i}
                      className="flex flex-col-reverse gap-1 md:gap-2"
                    >
                      <input
                        readOnly
                        value={value}
                        className="w-full p-2 text-sm md:text-base bg-gray-100 rounded-md border border-gray-300"
                        disabled
                      />
                      <label className="text-xs md:text-sm font-medium text-gray-600">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="space-y-3 md:space-y-4">
                  {[
                    { label: "الجنسية", value: request.nationality },
                    { label: "الكلية", value: request.faculty },
                    { label: "البريد الإلكتروني", value: request.Email },
                  ].map(({ label, value }, i) => (
                    <div
                      key={i}
                      className="flex flex-col-reverse gap-1 md:gap-2"
                    >
                      <input
                        readOnly
                        value={value}
                        className="w-full p-2 text-sm md:text-base bg-gray-100 rounded-md border border-gray-300"
                        disabled
                      />
                      <label className="text-xs md:text-sm font-medium text-gray-600">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Section */}
              <div className="mt-4 md:mt-6">
                <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                  المستندات الرسمية المحملة:
                </h2>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
                  {request.documents.map((doc) => (
                    <div
                      key={doc.DocId}
                      className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-2 md:p-3 rounded-md border border-gray-200"
                    >
                      <span className="text-sm md:text-base text-gray-700 mb-2 md:mb-0 md:mr-3 text-center md:text-right">
                        {doc.FileName.replace(/([A-Z])/g, " $1")}
                      </span>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                        target="_blank"
                        className="w-full md:w-auto"
                      >
                        <button className="w-full md:w-32 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base px-3 py-2 md:py-2 rounded-md transition-colors">
                          عرض الملف
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mt-6">
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base transition-colors w-full md:w-48"
                >
                  قبول الطلب
                </button>
                <button
                  onClick={() => setIsDialogOpenSecond(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base transition-colors w-full md:w-48"
                >
                  رفض الطلب
                </button>
              </div>

              {/* Dialogs */}
              <GeneralDialog
                dialogTitle="تأكيد القبول"
                description="هل أنت متأكد من قبول هذا الطلب؟"
                isOpen={isDialogOpen}
                onConfirm={handleConfirm}
                onOpenChange={setIsDialogOpen}
              />

              <GeneralDialog
                dialogTitle={`هل أنت متأكد أنك تريد رفض الطالب ${requesteDetails[0].full_name}؟`}
                description="قد لا تتمكن من التراجع بعد إتمامها"
                isOpen={isDialogOpenSecond}
                onConfirm={handleCancel}
                onOpenChange={setIsDialogOpenSecond}
              >
                <span className="space-y-3 mt-3">
                  <label className="block text-sm md:text-base font-medium text-gray-700">
                    سبب الرفض:
                  </label>
                  <textarea
                    className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل سبب الرفض..."
                    onChange={(e) => setReason(e.target.value)}
                  />
                </span>
              </GeneralDialog>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RequestDetails;
