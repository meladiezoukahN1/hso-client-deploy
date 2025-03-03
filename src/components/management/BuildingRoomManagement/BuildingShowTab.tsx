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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
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

  const { buildingList } = useAppSelector((state) => state.mangement.buildings);
  const disptch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false); // Track the dialog open state

  useEffect(() => {
    const handelDisptch = async () => {
      disptch(showBuilding());
      disptch(getSupervisors());
    };
    handelDisptch();
  }, [disptch]);

  const handleBuildingChange = (buildingValue: string) => {
    const selected = buildingList.find((b) => b.id === parseInt(buildingValue));
    if (selected) {
      setValue("id", selected.id);
      setValue("name_building", selected.name_building);
      setValue("total_rooms", selected.total_rooms);
      setValue("count_haunted_room", selected.count_haunted_room);
      setValue("count_room_available", selected.count_room_available);
      setValue("floors", selected.floors);
    }
  };

  const handleSupervisorChange = (value: string[]) => {
    if (value.length <= 3) {
      const selected = supervisors.supervisorList.filter((s) =>
        value.includes(s.id.toString())
      );
      setValue(
        "supervisor",
        selected.map((s) => ({ ...s, id: parseInt(s.id) }))
      );
    } else {
      toast.error("يمكن اختيار 3 مشرفين فقط");
    }
  };

  const handleConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = getValues();
    const newBuildingDataToSubmit: BuildingPutRequest = {
      name_building: formData.name_building,
      floors: formData.floors,
      supervisors: formData.supervisor.map((s) => s.id),
    };
    await disptch(
      editBuilding({
        id: formData.id,
        editData: newBuildingDataToSubmit,
      })
    );
    await disptch(showBuilding());
    setIsOpen(false);
  };

  if (isLoading) return <Loading />;

  const onSubmit = () => {
    setIsOpen(true);
  };

  return (
    <div className="p-7 text-right gap-10">
      <div className="flex items-center mt-4">
        <label htmlFor="building" className="ml-4 font-bold">
          المبنى:
        </label>
        <SelectValueComponents
          title=""
          value={getValues("id") ? getValues("id").toString() : "none"}
          data={buildingList.map((build) => ({
            label: build.name_building.toString(),
            value: build.id.toString(),
          }))}
          onValueChange={handleBuildingChange}
        />
      </div>

      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <EditableField errors={errors} register={register} disabled>
          <MultiSelect
            onChange={handleSupervisorChange}
            label="المشرفين"
            options={supervisors.supervisorList.map((s) => ({
              label: s.FullName,
              value: s.id.toString(),
            }))}
            value={getValues("supervisor").map((s) => s.id.toString())}
          />
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
            تحديث المستخدم
          </Button>
        </div>
      </form>

      <GeneralDailog
        dialogTitle="هل أنت متأكد أنك تريد تحديث هذا المستخدم؟"
        description={`قد لا تتمكن من التراجع بعد إتمامها`}
        onConfirm={handleConfirm}
        onOpenChange={(open) => setIsOpen(open)}
        isOpen={isOpen}
      />
    </div>
  );
}
