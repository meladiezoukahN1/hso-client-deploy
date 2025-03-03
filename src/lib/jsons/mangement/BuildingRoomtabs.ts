import BuildingShowTab from "@/components/management/BuildingRoomManagement/BuildingShowTab";
import AddBuildingTab from "@/components/management/BuildingRoomManagement/AddBuildingTab";
import RoomManagementTab from "@/components/management/BuildingRoomManagement/RoomManagementTab";
import AddRoomTab from "@/components/management/BuildingRoomManagement/AddRoomTab";

export const tabsConfig = [
  {
    label: "عرض المباني",
    value: "Show-Building",
    component: BuildingShowTab,
  },
  {
    label: "اضافة مبنى جديد",
    value: "Add-Building",
    component: AddBuildingTab,
  },
  {
    label: "إدارة الغرف",
    value: "Room-Management",
    component: RoomManagementTab,
  },
  {
    label: "اضافة غرفة جديدة",
    value: "Add-Room",
    component: AddRoomTab,
  },
];

export const columnsStudentsRooms = [
  { header: "الاسم", accessor: "fullname" },
  { header: "الكلية", accessor: "facultyName" },
  { header: "رقم الملف", accessor: "fileNo" },
];
