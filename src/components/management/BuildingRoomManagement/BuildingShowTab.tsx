"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import GeneralDailog from "@/components/ui/GeneralDailog";
import MultiSelect from "@/components/ui/multi-select";
import {
  showBuilding,
  getSupervisors,
  editBuilding,
} from "@/lib/fetsures/management/action";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import Loading from "@/app/home/loading";
import { BuildingPutRequest } from "mangement";
import { toast } from "sonner";
import SelectValueComponents from "@/components/ui/SelectValue";
import {
  buildingShowSchema,
  BuildingShowType,
} from "@/validation/managements/building";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditableField from "./ui/EditBuilding";

export default function BuildingShowTab() {
  const { isLoading, supervisors } = useAppSelector((state) => state.mangement);
  const { buildingList } = useAppSelector((state) => state.mangement.buildings);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<BuildingShowType>({
    resolver: zodResolver(buildingShowSchema),
    defaultValues: {
      id: 0,
      count_haunted_room: 0,
      count_room_available: 0,
      floors: 0,
      name_building: "",
      total_rooms: 0,
      supervisor: [],
    },
  });

  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(showBuilding());
    dispatch(getSupervisors());
  }, [dispatch]);

  const handleBuildingChange = (buildingValue: string) => {
    const selected = buildingList.find((b) => b.id === parseInt(buildingValue));
    if (selected) {
      setSelectedBuildingId(selected.id);
      reset({
        ...selected,
        supervisor: selected.supervisor || [],
      });
    }
  };

  const handleSupervisorChange = (value: string[]) => {
    if (value.length > 3) {
      toast.error("يمكن اختيار 3 مشرفين فقط");
      return;
    }
    setValue(
      "supervisor",
      supervisors.supervisorList
        .filter((s) => value.includes(s.id.toString()))
        .map((s) => ({ ...s, id: parseInt(s.id) }))
    );
  };

  const handleConfirm = async () => {
    if (!selectedBuildingId) {
      toast.error("يرجى اختيار مبنى أولاً");
      return;
    }

    const formData = watch();
    const newBuildingData: BuildingPutRequest = {
      name_building: formData.name_building,
      floors: formData.floors,
      supervisors: formData.supervisor.map((s) => s.id),
    };

    try {
      await dispatch(
        editBuilding({
          id: selectedBuildingId,
          editData: newBuildingData,
        })
      ).unwrap();

      toast.success("تم تحديث البيانات بنجاح");
      reset({
        id: 0,
        count_haunted_room: 0,
        count_room_available: 0,
        floors: 0,
        name_building: "",
        total_rooms: 0,
        supervisor: [],
      });
      setSelectedBuildingId(null);

      dispatch(showBuilding());
      setIsOpen(false);
    } catch {
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="text-right">
      <div className="flex items-center gap-[2%] mr-[6%]">
        <label htmlFor="building" className="font-bold">
          المبنى:
        </label>
        <SelectValueComponents
          title=""
          defaultLabel="اختر المبنى"
          value={watch("id")?.toString() || "none"}
          data={buildingList.map((build) => ({
            label: build.name_building,
            value: build.id.toString(),
          }))}
          onValueChange={handleBuildingChange}
          ClassName="w-full md:w-[38%] "
        />
      </div>

      <form className="mt-4" onSubmit={handleSubmit(() => setIsOpen(true))}>
        <EditableField errors={errors} register={register} disabled={false}>
          <div className="mr-[4%] w-full">
            <MultiSelect
              onChange={handleSupervisorChange}
              label="المشرفين"
              options={supervisors.supervisorList.map((s) => ({
                label: s.FullName,
                value: s.id.toString(),
              }))}
              value={watch("supervisor").map((s) => s.id.toString())}
            />
          </div>
          {errors.supervisor && (
            <p className="text-red-500 text-sm mt-2 mr-5 text-right">
              {errors.supervisor.message}
            </p>
          )}
        </EditableField>

        <div className="flex w-full justify-center mt-6">
          <Button
            className="bg-primary-600 hover:bg-primary-800 w-60"
            type="submit"
          >
            حفظ التعديلات
          </Button>
        </div>
      </form>

      <GeneralDailog
        dialogTitle="تأكيد التحديث"
        description="هل أنت متأكد من رغبتك في حفظ التعديلات؟"
        onConfirm={handleConfirm}
        onOpenChange={(open) => setIsOpen(open)}
        isOpen={isOpen}
      />
    </div>
  );
}
