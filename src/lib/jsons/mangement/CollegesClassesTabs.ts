import AddCollegesTab from "@/components/management/CollegesClasses/AddCollegesTab";
import AddClassesTab from "@/components/management/CollegesClasses/AddClassesTab";
import ShowClassesTab from "@/components/management/CollegesClasses/ShowClassesTab";

export const tabsConfig = [
  {
    label: "اضافة كلية",
    value: "Add-Colleges",
    component: AddCollegesTab,
  },
  {
    label: "اضافة فصل ",
    value: "Add-Classes",
    component: AddClassesTab,
  },
  {
    label: "عرض الفصول",
    value: "Show-Classes",
    component: ShowClassesTab,
  },
];

export const columnsEditSeason = [
  { header: "الكلية", accessor: "faculty_name" },
  { header: "اسم الفصل الدراسي", accessor: "name" },
  { header: "بداية الفصل", accessor: "startDate" },
  { header: "نهاية الفصل", accessor: "endDate" },
  { header: "تعديل", accessor: "edit" },
];

export const selectSeasons = [
  {
    label: "ربيع",
    value: "ربيع",
  },
  {
    label: "خريف",
    value: "خريف",
  },
];
