import { FaClipboardList, FaCog, FaGraduationCap } from "react-icons/fa";
import { HiOutlineDocumentReport, HiCog } from "react-icons/hi";
import { PiStudentLight } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";
import { FiHome } from "react-icons/fi";

export const navbar = [
  { label: "الرئيسية", icon: FiHome, href: "/home" },
  { label: "إجراءات الطالب", icon: FaGraduationCap, href: "/students" },
  { label: "التقارير", icon: FaClipboardList, href: "/reports" },
  { label: "الإدارة", icon: FaCog, href: "/management" },
];

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
  children?: {
    name: string;
    href: string;
    icon?: React.ElementType;
  }[];
}
export const sidebarItems: SidebarItem[] = [
  {
    name: "الرئيسية",
    href: "/home",
    icon: AiOutlineHome,
  },
  {
    name: "إجراءات الطلبة",
    href: "#",
    icon: PiStudentLight,
    children: [
      {
        name: "قبول الطلبات",
        href: "/students/requests",
      },
      {
        name: "الغاء تسجيل طالب",
        href: "/students/expelstudent",
      },
      {
        name: "تعديل الغرفة",
        href: "/students/editroom",
      },
      {
        name: "عرض الطلبة",
        href: "/students/studentsTable",
      },
      {
        name: "حجز غرفة للطالب",
        href: "/students/bookroom",
      },
    ],
  },
  {
    name: "التقارير",
    href: "/reports",
    icon: HiOutlineDocumentReport,
    children: [
      {
        name: "تقرير الطلبة",
        href: "/reports/students",
      },
      {
        name: "تقرير المدن",
        href: "/reports/cities",
      },
      {
        name: "تقرير الغرف و المباني",
        href: "/reports/buildings",
      },
      {
        name: "تقرير المستنفذين ",
        href: "/reports/exhausted",
      },
    ],
  },
  {
    name: "الإدارة",
    href: "#",
    icon: HiCog,
    children: [
      {
        name: "إدارة المستخدمين",
        href: "/management/UserManagement",
      },
      {
        name: "إدارة المباني و الغرف",
        href: "/management/BuildingRoomManagement",
      },
      {
        name: "الكليات و الفصول",
        href: "/management/CollegesClasses",
      },
      {
        name: "ادارة السكان",
        href: "/management/StudentManagement",
      },
      {
        name: "ادارة الاعلانات",
        href: "/management/AdvertisingManagement",
      },
    ],
  },
];
