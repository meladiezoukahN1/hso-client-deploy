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
import { ReactNode } from "react";

interface ImageDialogProps {
  triggerIcon?: React.ElementType;
  dialogTitle: string;
  dialogDetails?: string;
  imageSrc?: string;
  imageAlt?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  cancelButtonClass?: string;
  clasName?: string;
  description: string | ReactNode;
  onOpenChange?: (open: boolean) => void;
  isOpen: boolean;
  onConfirm: (e: React.MouseEvent<HTMLElement>) => void; // دالة التأكيد
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
}

const GeneralDailog = ({
  dialogTitle,
  description,
  imageSrc,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  confirmButtonClass,
  cancelButtonClass,
  onConfirm,
  onCancel,
  onOpenChange,
  isOpen,
  children,
}: ImageDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="max-w-[95%] sm:max-w-md bg-gray-50 text-right shadow-lg rounded-lg border border-primary-200 p-4 md:p-6">
        {" "}
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-xl font-bold mt-20 mb-4 text-primary-600 text-center">
            {dialogTitle}
          </DialogTitle>
          <DialogDescription className=" text-black text-lg text-center pb-9">
            {description}
            {children}
          </DialogDescription>
        </DialogHeader>
        {imageSrc ? <div className="flex justify-center my-4"></div> : ""}
        <DialogFooter className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              size="sm"
              className={`w-full md:w-auto text-white bg-green-500 hover:bg-green-600  ${confirmButtonClass}`}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              type="submit"
              variant="destructive"
              size="sm"
              className={`w-full md:w-auto ${cancelButtonClass}`}
              onClick={onCancel}
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
