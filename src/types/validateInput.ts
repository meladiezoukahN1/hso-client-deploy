import { z } from "zod";

// Define the schema for the form data
export const formSchema = z.object({
  FirstName: z
    .string()
    .min(1, "الاسم الأول مطلوب")
    .regex(
      /^[\u0600-\u06FF\s]{2,}$/,
      "يجب أن يكون الاسم باللغة العربية ويتكون من كلمتين على الأقل"
    ),
  MidName: z
    .string()
    .min(1, "الاسم الأوسط مطلوب")
    .regex(
      /^[\u0600-\u06FF\s]{2,}$/,
      "يجب أن يكون الاسم باللغة العربية ويتكون من كلمتين على الأقل"
    ),
  LastName: z
    .string()
    .min(1, "الاسم الأخير مطلوب")
    .regex(
      /^[\u0600-\u06FF\s]{2,}$/,
      "يجب أن يكون الاسم باللغة العربية ويتكون من كلمتين على الأقل"
    ),
  NatNo: z
    .string()
    .min(1, "الرقم الوطني مطلوب")
    .regex(/^\d+$/, "يجب أن يتكون الرقم الوطني من أرقام فقط"),
  Phone: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .regex(/^(\+218|00218)?\d{9}$/, "يجب أن يكون رقم هاتف ليبي صحيح"),
  Email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  city: z.string().min(1, "المدينة مطلوبة"),
  gender: z.string().min(1, "الجنس مطلوب"),
  faculty: z.string().min(1, "الكلية مطلوبة"),
  studentID: z
    .string()
    .min(5, "رقم القيد يجب أن يكون على الأقل 5 أرقام")
    .max(10, "رقم القيد يجب ألا يتجاوز 10 أرقام")
    .regex(/^\d+$/, "يجب أن يتكون رقم القيد من أرقام فقط"),
  nationality: z.string().min(1, "الجنسية مطلوبة"),
  DOB: z.string().min(1, "تاريخ الميلاد مطلوب"),
});

// const filesSchema = z.object({
//   birthCertificate: z.instanceof(File).nullable(),
//   residencyProof: z.instanceof(File).nullable(),
//   personalPhotos: z.instanceof(File).nullable(),
//   secondaryCertificate: z.instanceof(File).nullable(),
// });

// const fileSchema = z.object({
//   birthCertificate: z
//     .instanceof(File)
//     .refine(
//       (file) => file?.type === "application/pdf",
//       "يجب أن يكون الملف بصيغة PDF"
//     )
//     .refine(
//       (file) => file?.size <= 2 * 1024 * 1024,
//       "حجم الملف يجب ألا يتجاوز 2 ميجا بايت"
//     )
//     .nullable(),
//   residencyProof: z
//     .instanceof(File)
//     .refine(
//       (file) => file?.type === "application/pdf",
//       "يجب أن يكون الملف بصيغة PDF"
//     )
//     .refine(
//       (file) => file?.size <= 2 * 1024 * 1024,
//       "حجم الملف يجب ألا يتجاوز 2 ميجا بايت"
//     )
//     .nullable(),
//   personalPhotos: z
//     .instanceof(File)
//     .refine(
//       (file) => file?.type === "application/pdf",
//       "يجب أن يكون الملف بصيغة PDF"
//     )
//     .refine(
//       (file) => file?.size <= 2 * 1024 * 1024,
//       "حجم الملف يجب ألا يتجاوز 2 ميجا بايت"
//     )
//     .nullable(),
//   secondaryCertificate: z
//     .instanceof(File)
//     .refine(
//       (file) => file?.type === "application/pdf",
//       "يجب أن يكون الملف بصيغة PDF"
//     )
//     .refine(
//       (file) => file?.size <= 2 * 1024 * 1024,
//       "حجم الملف يجب ألا يتجاوز 2 ميجا بايت"
//     )
//     .nullable(),
// });
