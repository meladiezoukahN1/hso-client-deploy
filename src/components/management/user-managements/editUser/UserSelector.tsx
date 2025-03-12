import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { getUserById } from "@/lib/fetsures/management/action";
import { BasicUser } from "next-auth";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function UserSelector({ userlist }: { userlist: BasicUser[] }) {
  const { userSelected } = useAppSelector((state) => state.mangement);
  const dispatch = useAppDispatch();

  const handleSelectUser = (value: string) => {
    const selectedId = Number(value);
    if (selectedId) {
      dispatch(getUserById(selectedId));
    }
  };

  return (
    <div className="flex flex-col items-start w-full ">
      <div className="grid grid-cols-[minmax(120px,1fr)_3fr] gap-x-4 items-center mb-[2%] w-2/4 ">
        <label className="font-bold text-right whitespace-nowrap pr-2 h-10 flex items-center justify-end ">
          اختر المستخدم:
        </label>
        <Select
          onValueChange={handleSelectUser}
          value={String(userSelected?.id || "")}
        >
          <SelectTrigger className="w-full h-10 border rounded bg-orange-50 ">
            <div className="w-full text-center">
              <SelectValue
                placeholder={
                  <span className="text-muted-foreground">
                    {userSelected ? userSelected.FullName : "المستخدمين"}
                  </span>
                }
              />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-64 overflow-auto">
            {userlist.map((user) => (
              <SelectItem key={user.id} value={String(user.id)}>
                {user.FullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
