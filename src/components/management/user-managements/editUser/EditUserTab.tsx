import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import UserSelector from "./UserSelector";
import InputFields from "./EditableField";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  editUser,
  getUsers,
  disabledUser,
} from "@/lib/fetsures/management/action";
import { Button, DailogLoading, GeneralDailog } from "@/components/ui";
import { EditUserSchema, EditUserType } from "@/validation/managements/user";

export default function EditUserTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDisable, setIsOpenDisable] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.mangement);
  const { userlist, userSelected } = useAppSelector(
    (state) => state.mangement.user
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<EditUserType>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      id: 0,
    },
  });

  useEffect(() => {
    if (userSelected && userSelected?.id) {
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
    } finally {
      setIsOpen(false);
    }
  };

  const handleDisable = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const formData = getValues();
      await dispatch(disabledUser(formData.id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("تم تعطيل المستخدم بنجاح");
          setIsOpenDisable(false);
        }
      });
      await dispatch(getUsers());
      reset();
    } catch {
    } finally {
      setIsOpen(false);
    }
  };

  const [showErrors, setShowErrors] = useState(false);

  const onSubmit = async () => {
    ("Form submitted successfully!");
    setIsOpen(true);
  };

  const onError = () => {
    if (!userSelected || !userSelected?.id) {
      toast.error("قم باختيار مستخدم اولا");
      return;
    }
    setShowErrors(true);
  };

  return (
    <div className="p-2 mt-8 ml-[17%]">
      <UserSelector userlist={userlist} />
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <InputFields
          register={register}
          errors={showErrors ? errors : {}}
          disabled={!isUserSelected}
        />
        <div className="flex justify-center items-center gap-12 mt-12">
          <Button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white w-60"
          >
            قبول التغييرات
          </Button>
          <Button
            type="button"
            className="bg-orange-50 ring-1 hover:bg-orange-200 ring-primary-600 text-black w-60"
            onClick={() =>
              userSelected?.id
                ? setIsOpenDisable(true)
                : toast.error("قم باختيار المستخدم أولا")
            }
          >
            تعطيل الحساب
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
