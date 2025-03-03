import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { getUserById } from "@/lib/fetsures/management/action";
import { BasicUser } from "next-auth";

export default function UserSelector({ userlist }: { userlist: BasicUser[] }) {
  const { userSelected } = useAppSelector((state) => state.mangement);
  const dispatch = useAppDispatch();
  const handleSelectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    if (selectedId) {
      dispatch(getUserById(selectedId));
    }
  };

  return (
    <div className="flex items-center mb-6 mt-4">
      <label className="ml-4 font-bold">اختر المستخدم</label>
      <select
        onChange={handleSelectUser}
        className="border p-2 rounded-md w-52 bg-white"
      >
        <option value={userSelected?.id ?? ""}>
          {userSelected ? userSelected.FullName : "المستخدمين"}
        </option>
        {userlist.map((user) => (
          <option key={user.id} value={user.id}>
            {user.FullName}
          </option>
        ))}
      </select>
    </div>
  );
}
