import {
  validateLibyanPhoneNumber,
  validateArabicOnly,
} from "@/hooks/custom-hooks";
import { z } from "zod";

export const ApplicationSchema = z
  .object({
    FirstName: z
      .string()
      .trim()
      .nonempty("الاسم الأول مطلوب")
      .refine(validateArabicOnly, "يجب أن يكون الاسم باللغة العربية فقط"),
    MidName: z
      .string()
      .trim()
      .nonempty("الاسم الأوسط مطلوب")
      .refine(validateArabicOnly, "يجب أن يكون الاسم باللغة العربية فقط"),
    LastName: z
      .string()
      .trim()
      .nonempty("الاسم الأخير مطلوب")
      .refine(validateArabicOnly, "يجب أن يكون الاسم باللغة العربية فقط"),
    NatNo: z
      .string()
      .trim()
      .nonempty("الرقم الوطني مطلوب")
      .min(12, "يجب ان يتكون الرقم الوطني من 12 رقما")
      .max(12, "يجب ان يتكون الرقم الوطني من 12 رقما")
      .refine(
        (val) => !isNaN(Number(val)) && val.length === 12,
        "يجب ان يتكون الرقم الوطني من 12 رقما"
      ),
    Phone: z
      .string()
      .trim()
      .nonempty("رقم الهاتف مطلوب")
      .refine(validateLibyanPhoneNumber, "رقم الهاتف غير صالح"),
    Email: z
      .string()
      .trim()
      .nonempty("البريد الإلكتروني مطلوب")
      .email("البريد الإلكتروني غير صالح"),
    city: z
      .string()
      .trim()
      .nonempty("المدينة مطلوبة")
      .refine((data) => data !== "none", "قم باختيار المدينة"),
    gender: z
      .string()
      .trim()
      .nonempty("الجنس مطلوب")
      .refine((data) => data !== "none", "قم باختيار الجنس"),
    faculty: z
      .string()
      .trim()
      .nonempty("الكلية مطلوبة")
      .refine((data) => data !== "none", "قم باختيار الكلية"),
    studentID: z
      .string()
      .trim()
      .nonempty("رقم القيد مطلوب")
      .refine(
        (val) => !isNaN(Number(val)) && val.length >= 5 && val.length <= 10,
        "رقم القيد غير صالح"
      ),
    nationality: z
      .string()
      .trim()
      .nonempty("الجنسية مطلوبة")
      .refine((data) => data !== "none", "قم باختيار الجنسية"),

    DOB: z.string().trim().nonempty("تاريخ الميلاد مطلوب"),
    birthCertificate: z
      .instanceof(File, { message: "يرجى تحميل الملف" })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "الملف يجب أن يكون أقل من 5MB",
      }),
    residencyProof: z
      .instanceof(File, { message: "يرجى تحميل الملف" })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "الملف يجب أن يكون أقل من 5MB",
      }),
    personalPhotos: z
      .instanceof(File, { message: "يرجى تحميل الملف" })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "الملف يجب أن يكون أقل من 5MB",
      }),
    secondaryCertificate: z
      .instanceof(File, { message: "يرجى تحميل الملف" })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "الملف يجب أن يكون أقل من 5MB",
      }),
  })
  .refine(
    (data) => {
      const dobDate = new Date(data.DOB);
      if (isNaN(dobDate.getTime())) return false;

      const natNoYearPart = data.NatNo.substring(1, 5);

      const dobYear = dobDate.getFullYear().toString();

      return natNoYearPart === dobYear && data.NatNo[0] === data.gender;
    },
    {
      path: ["NatNo"],
      message: "الرقم الوطني لا يتطابق مع الجنس أو تاريخ الميلاد",
    }
  );

export type ApplicationFormValues = z.infer<typeof ApplicationSchema>;
