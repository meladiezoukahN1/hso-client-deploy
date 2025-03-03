import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ImageDialogProps {
  triggerIcon?: React.ElementType; // الأيقونة هي Component اختياري
  dialogTitle: string;
  imageSrc?: string; // مسار الصورة
  imageAlt?: string; // النص البديل للصورة
  confirmText?: string; // النص على زر التأكيد
  cancelText?: string; // النص على زر الإلغاء
  confirmButtonClass?: string; // تنسيق CSS لزر التأكيد
  cancelButtonClass?: string; // تنسيق CSS لزر الإلغاء
  clasName?: string;
  description: string;
  onOpenChange: (open: boolean) => void;
  isOpen: boolean;
  onConfirm: (e: React.MouseEvent<HTMLElement>) => void; // دالة التأكيد
  dialogClassName?: string; // خاصية جديدة لتخصيص تصميم المحتوى
}

const GeneralDailog = ({
  dialogTitle,
  imageSrc,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  confirmButtonClass,
  cancelButtonClass,
  description,
  onConfirm,
  onOpenChange,
  isOpen,
  dialogClassName = "", // افتراضي
}: ImageDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent
        className={`sm:max-w-lg bg-gray-50 text-right shadow-lg rounded-lg border border-gray-200 ${dialogClassName}`}
      >
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-xl font-bold mt-20 mb-4">
            {dialogTitle}
          </DialogTitle>
          <DialogDescription className=" text-black text-lg">
            {description}
          </DialogDescription>
        </DialogHeader>
        {imageSrc ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSrc})` }}
          ></div>
        ) : null}
        <DialogFooter className="flex flex-col sm:flex-row gap-4 mt-6 w-4/5 mx-auto relative z-10">
          <DialogClose asChild>
            <Button
              type="button"
              className={`text-white bg-green-500 w-1/2 hover:bg-green-600 ${confirmButtonClass}`}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              className={`text-white bg-red-500 w-1/2 hover:bg-red-600 ${cancelButtonClass} text-center`}
            >
              {cancelText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GeneralDailog;
