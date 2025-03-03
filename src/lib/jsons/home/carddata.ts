import { CardProps } from "home";
import { LuFolders, LuBedSingle } from "react-icons/lu";
import { RxPerson } from "react-icons/rx";

export const cardData: CardProps[] = [
  {
    title: "العدد الكلي للطلبة",
    count: 120,
    icon: RxPerson,
  },
  {
    title: "الغرف المتوفرة",
    count: 25,
    icon: LuBedSingle,
  },
  {
    title: "الطلبات المعلقة",
    count: 11,
    icon: LuFolders,
  },
];
