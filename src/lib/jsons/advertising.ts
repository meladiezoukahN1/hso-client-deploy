import AdvertisingManagement from "@/components/management/AdvertisingManagement/AdvertisingManagement";
import Edit from "@/components/management/AdvertisingManagement/edit";

export const tabsConfig = [
  {
    label: "اضافة اعلان",
    value: "add-advertising",
    component: AdvertisingManagement,
  },
  {
    label: "تعديل اعلان",
    value: "edit-advertising",
    component: Edit,
  },
];
