import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CiSquarePlus } from "react-icons/ci";
import {
  postAcademicSeasons,
  getAcademicSeasons,
  getShowFaculties,
} from "@/lib/fetsures/management/action";
import { ShowFaculties } from "mangement";
import validateDateRange from "@/hooks/validate-date";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux-toolkit";

interface AddClassProps {
  faclty: ShowFaculties;
}

const AddClass: React.FC<AddClassProps> = ({ faclty }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [semester, setSemester] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [year, setYearState] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!validateDateRange(startDate, endDate, 90, 365)) {
      toast.error(
        "قم بالتاكد من ان تاريخ بداية و نهاية الفصل الدراسي اكثر من 90 يوم"
      );
      return;
    }
    if (!semester) {
      toast.error("قم باختيار الفصل");
      return;
    }
    if (!year) {
      toast.error("قم باختيار السنة الدراسية");
      return;
    }

    await dispatch(
      postAcademicSeasons({
        faculty_id: faclty.label ?? 0,
        date: year,
        endDate: endDate,
        startDate: startDate,
        name: semester,
      })
    );
    await dispatch(getShowFaculties());
    await dispatch(getAcademicSeasons());
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="bg-background text-secondary hover:bg-background"
          >
            <CiSquarePlus className="hover:bg-muted" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-blue-600">
              إضافة فصل دراسي
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  الفصل الدراسي:
                </label>
                <Select onValueChange={setSemester}>
                  <SelectTrigger className="w-full" dir="rtl">
                    <SelectValue placeholder="قم بإختيار الفصل الدراسي" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem dir="rtl" value="ربيع">
                      ربيع{" "}
                    </SelectItem>
                    <SelectItem dir="rtl" value="خريف">
                      خريف{" "}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  السنة الدراسية:
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="أدخل السنة الدراسية"
                  maxLength={4}
                  onChange={(e) => {
                    if (
                      parseInt(e.target.value) === new Date().getFullYear() &&
                      parseInt(e.target.value) < new Date().getFullYear() + 1
                    ) {
                      setYearState(e.target.value);
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                بداية الفصل الدراسي:
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                نهاية الفصل الدراسي:
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter className="w-full gap-2 my-auto">
            <div className="w-full flex justify-around">
              <Button
                variant="destructive"
                className="bg-danger hover:bg-danger w-40"
                onClick={() => setOpen(false)}
              >
                إلغاء
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 w-40"
                onClick={handleSubmit}
              >
                إضافة
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddClass;
