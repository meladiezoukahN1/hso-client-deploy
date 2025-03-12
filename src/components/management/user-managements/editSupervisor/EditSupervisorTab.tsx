import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  editSupervisor,
  getSupervisorsById,
  getUsers,
} from "@/lib/fetsures/management/action";
import { Button, DailogLoading, GeneralDailog } from "@/components/ui";
import {
  EditSuperVisorSchema,
  EditSuperVisorType,
} from "@/validation/managements/supervisor";

import EditField from "./EditField";
import SupervisorSelector from "./SupervisorSelector";
import BuildingSelector from "./BuildingSelector";
import { Building, GetByIdSupervisorResponse } from "mangement";

export default function EditSupervisorTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const dispatch = useAppDispatch();
  const { status, buildings } = useAppSelector((state) => state.mangement);
  const { supervisorSelected } = useAppSelector(
    (state) => state.mangement.supervisors
  );

  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(
    null
  );
  const [selectedSupervisorId, setSelectedSupervisorId] = useState<
    number | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<EditSuperVisorType>({
    resolver: zodResolver(EditSuperVisorSchema),
  });
  useEffect(() => {
    if (supervisorSelected?.supervisor.id) {
      setValue("id", supervisorSelected.supervisor.id);
      setValue("Fullname", supervisorSelected.supervisor.Fullname);
      setValue("address", supervisorSelected.supervisor.address);
      setValue("Phone", supervisorSelected.supervisor.Phone);
      setValue("Email", supervisorSelected.supervisor.Email);
      setIsUserSelected(true);
    } else {
      setIsUserSelected(false);
    }
  }, [supervisorSelected, setValue]);

  const handleConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const formData = getValues();
      await dispatch(editSupervisor(formData)).unwrap();
      await dispatch(getUsers());
      reset();
      setBuildingSelected(null);
      setSelectedBuildingId(null);
      setIsUserSelected(false);
    } catch {
    } finally {
      setIsOpen(false);
    }
  };

  const [showErrors, setShowErrors] = useState(false);

  const onSubmit = async () => {
    setIsOpen(true);
  };

  const onError = () => {
    const formData = getValues();
    if (!formData.id) {
      toast.error("قم باختيار مستخدم أولا");
      return;
    }
    setShowErrors(true);
  };
  const handleSelectSupervisor = (supervisorId: number) => {
    if (supervisorId) {
      dispatch(getSupervisorsById(supervisorId)).then((res) => {
        const { supervisor } = res.payload as GetByIdSupervisorResponse;
        setValue("id", supervisor.id);
        setValue("Fullname", supervisor.Fullname);
        setValue("address", supervisor.address);
        setValue("Email", supervisor.Email);
        setValue("Phone", supervisor.Phone);
      });
    }
  };

  const [buildingSelected, setBuildingSelected] = useState<Building | null>(
    null
  );
  const handleSelectBuilding = async (buildingId: number) => {
    setBuildingSelected(
      buildings.buildingList.find((b) => b.id === buildingId) || null
    );
  };
  return (
    <div className="p-2 mt-6 flex flex-col items-start">
      <div className="md:flex gap-8 mb-[3%] ml-[7%]">
        <BuildingSelector
          buildings={buildings.buildingList}
          onSelect={(id) => {
            setSelectedBuildingId(id);
            setSelectedSupervisorId(null);
            handleSelectBuilding(id);
          }}
          value={selectedBuildingId ? String(selectedBuildingId) : "default"}
        />

        <SupervisorSelector
          supervisors={buildingSelected?.supervisor || []}
          onSelect={(id) => {
            setSelectedSupervisorId(id);
            handleSelectSupervisor(id);
          }}
          disabled={!selectedBuildingId}
          value={
            selectedSupervisorId ? String(selectedSupervisorId) : "default"
          }
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col justify-center items-center"
      >
        <EditField
          register={register}
          errors={showErrors ? errors : {}}
          disabled={!isUserSelected}
        />
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white w-60"
          >
            قبول التغييرات
          </Button>
        </div>
      </form>
      <GeneralDailog
        dialogTitle="هل أنت متأكد أنك تريد تحديث هذا المستخدم؟"
        description="قد لا تتمكن من التراجع بعد إتمامها"
        onConfirm={handleConfirm}
        onOpenChange={setIsOpen}
        isOpen={isOpen}
      />
      {status === "loading" && <DailogLoading />}
    </div>
  );
}
