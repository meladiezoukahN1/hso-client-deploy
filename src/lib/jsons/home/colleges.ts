import { CiPill, CiStethoscope } from "react-icons/ci";
import { LuScale } from "react-icons/lu";
import {RxRulerSquare } from "react-icons/rx";
import { MdOutlinePalette } from "react-icons/md";

export const getIcons = (nameCollage: string) => {
  if (nameCollage === "كلية الطب البشري") {
    return CiStethoscope;
  } else if (nameCollage === "كلية القانون") {
    return LuScale;
  } else if (nameCollage === "كلية الهندسة") {
    return RxRulerSquare;
  } else if (nameCollage === "كلية الفنون") {
    return MdOutlinePalette;
  } else if (nameCollage === "كلية الصيدلة") {
    return CiPill;
  } else {
    return null;
  }
};
