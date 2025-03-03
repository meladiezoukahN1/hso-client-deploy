import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  editUser,
  getSupervisorsById,
  getUsers,
} from "@/lib/fetsures/management/action";
import { Button, DailogLoading, GeneralDailog } from "@/components/ui";
import {
  EditSuperVisorSchema,
  EditSuperVisorType,
} from "@/validation/managements/supervisor";

import EditableField from "./EditableField";
import SupervisorSelector from "./SupervisorSelector";
import BuildingSelector from "./BuildingSelector";
import { Building, GetByIdSupervisorResponse } from "mangement";

export default function EditUserTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDisable, setIsOpenDisable] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const dispatch = useAppDispatch();
  const { status, error, buildings } = useAppSelector(
    (state) => state.mangement
  );
  const { userSelected } = useAppSelector((state) => state.mangement.user);

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
    if (userSelected?.id) {
      setValue("id", userSelected.id);
      setValue("FullName", userSelected.FullName);
      setValue("username", userSelected.username);
      setValue("phone", userSelected.phone);
      setValue("email", userSelected.email);
      setIsUserSelected(true);
    } else {
      setIsUserSelected(false);
    }
  }, [userSelected, setValue]);

  const handleConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const formData = getValues();
      await dispatch(editUser(formData)).unwrap();
      await dispatch(getUsers());
      reset();
    } catch {
      toast.error(`${error}`);
    } finally {
      setIsOpen(false);
    }
  };

  const handleDisable = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const formData = getValues();
      await dispatch(editUser(formData)).unwrap();
      await dispatch(getUsers());
      reset();
    } catch {
      toast.error(`${error}`);
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
    console.log(formData)
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
        setValue("FullName", supervisor.Fullname);
        setValue("email", supervisor.Email);
        setValue("phone", supervisor.Phone);
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
    <div className="p-2 mt-6 flex flex-col items-start mr-8">
      <div className="md:flex gap-8">
        <BuildingSelector
          buildings={buildings.buildingList}
          onSelect={handleSelectBuilding}
        />
        <SupervisorSelector
          supervisors={buildingSelected?.supervisor || []}
          onSelect={handleSelectSupervisor}
          disabled={buildingSelected === null}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col justify-center items-center"
      >
        <EditableField
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
      <GeneralDailog
        dialogTitle="هل أنت متأكد أنك تريد حذف هذا المستخدم؟"
        description="قد لا تتمكن من التراجع بعد إتمامها"
        onConfirm={handleDisable}
        onOpenChange={setIsOpenDisable}
        isOpen={isOpenDisable}
      />
      {status === "loading" && <DailogLoading />}
    </div>
  );
}
