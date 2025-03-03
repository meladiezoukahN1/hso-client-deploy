"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AcademicSeasons } from "mangement";
import {
  getAcademicSeasons,
  putAcademicSeasonsID,
} from "@/lib/fetsures/management/action";
import validateDateRange from "@/hooks/validate-date";
import { toast } from "sonner";
import SelectValueComponents from "@/components/ui/SelectValue";
import { selectSeasons } from "@/lib/jsons/mangement/CollegesClassesTabs";

type EditClassProps = {
  row: AcademicSeasons;
  onClose: () => void;
};

const EditClass: React.FC<EditClassProps> = ({ row, onClose }) => {
  const [startDate, setStartDate] = useState<string>(row.startDate);
  const [endDate, setEndDate] = useState<string>(row.endDate);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (name === "none" || name === "") {
      toast.error("الرجاء اختيار الفصل الدراسي");
      return;
    }
    if (!validateDateRange(startDate, endDate, 90, 365)) {
      toast.error(
        "قم بالتاكد من ان تاريخ بداية و نهاية الفصل الدراسي اكثر من 90 يوم"
      );
      return;
    }
    if (parseInt(date) !== new Date().getFullYear()) {
      toast.error("الرجاء اختيار السنة بشكل صحيح");
      return;
    }

    const updatedData = {
      ...row,
      name,
      startDate,
      endDate,
      date,
    };
    await dispatch(putAcademicSeasonsID({ ...updatedData, date: date }));
    await dispatch(getAcademicSeasons());
    onClose();
  };

  const [name, setName] = useState<string>(row.name);
  const [date, setDate] = useState<string>(row.date);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md bg-gray-100 p-6 rounded-md"
        aria-describedby=""
      >
        <DialogHeader>
          <DialogTitle className="text-center text-blue-600 font-bold">
            تعديل فصل دراسي لكلية {row.faculty_name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">
              الفصل الدراسي:
            </label>
            <SelectValueComponents
              title="اختر الفصل"
              data={selectSeasons}
              onValueChange={(e: string) => setName(e)}
              ClassName="w-48"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">
              بداية الفصل الدراسي:
            </label>
            <Input
              type="date"
              value={startDate.toString()}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-2/3 p-2 border rounded"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">
              نهاية الفصل الدراسي:
            </label>
            <Input
              type="date"
              value={endDate.toString()}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-2/3 p-2 border rounded"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">
              السنة الدراسية:
            </label>
            <Input
              type="text"
              value={date}
              maxLength={4}
              onChange={(e) => setDate(e.target.value)}
              className="w-2/3 p-2 border rounded"
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-around w-full mt-4">
            <Button
              className="bg-green-600 hover:bg-green-700 w-40"
              onClick={handleSave}
            >
              حفظ
            </Button>
            <Button
              className="bg-danger-600 hover:bg-danger-700 w-40"
              onClick={onClose}
            >
              إلغاء
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditClass;
