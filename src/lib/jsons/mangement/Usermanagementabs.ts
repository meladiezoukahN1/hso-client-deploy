import AddSupervisor from "@/components/management/user-managements/addSupervisor/AddSupervisorTab";
import AddUser from "@/components/management/user-managements/addUser/AddUserTab";
import EditSupervisor from "@/components/management/user-managements/editSupervisor/EditSupervisorTab";
import EditUser from "@/components/management/user-managements/editUser/EditUserTab";

export const tabsConfig = [
  {
    label: "اضافة مستخدم",
    value: "add-user",
    component: AddUser,
  },
  {
    label: "تعديل المستخدمين",
    value: "edit-user",
    component: EditUser,
  },
  {
    label: "اضافة مشرف",
    value: "add-supervisor",
    component: AddSupervisor,
  },
  {
    label: "تعديل مشرف",
    value: "edit-supervisor",
    component: EditSupervisor,
  },
];
