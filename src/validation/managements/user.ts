import validateLibyanPhoneNumber from "@/hooks/validate-phone";
import validateUsername from "@/hooks/validate-username";
import { z } from "zod";

export const AddUserSchema = z
  .object({
    FullName: z.string().nonempty("الاسم الكامل مطلوب"),
    username: z
      .string()
      .nonempty("اسم المستخدم مطلوب")
      .min(8, "اسم المستخدم يجب أن يكون أكثر من 8 أحرف"),
    address: z.string().nonempty("العنوان مطلوب"),
    phone: z
      .string()
      .nonempty("رقم الهاتف مطلوب")
      .regex(/^\d+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"), // مثال على التحقق من الأرقام فقط
    email: z
      .string()
      .nonempty("البريد الإلكتروني مطلوب")
      .email("البريد الإلكتروني غير صالح"),
    role: z.string().nonempty("الدور مطلوب"),
  })
  .refine((data) => validateUsername(data.username), {
    message: "يجب أن يحتوي اسم المستخدم على حروف كبيرة وصغيرة وأرقام",
    path: ["username"],
  })
  .refine((data) => validateLibyanPhoneNumber(data.phone), {
    message: "يجب أن يكون رقم الهاتف مكونًا من 10 أرقام",
    path: ["phone"],
  })
  .refine((data) => data.role === "موظف" || data.role === "مسؤول", {
    message: "يجب أن يكون الدور إما 'موظف' أو 'مسؤول'",
    path: ["role"],
  });
export const EditUserSchema = z.object({
  id: z.number(),
  FullName: z
    .string()
    .nonempty("الاسم الكامل مطلوب")
    .regex(/^[\u0600-\u06FF\s]+$/, "يجب أن يكون الاسم باللغة العربية فقط")
    .refine((name) => name.split(/\s+/).length >= 3, {
      message: "يجب أن يحتوي الاسم على 3 أسماء على الأقل",
    })
    .refine((name) => name.split(/\s+/).length <= 6, {
      message: "يجب ألا يحتوي الاسم على أكثر من 6 أسماء",
    }),
  username: z
    .string()
    .nonempty("اسم المستخدم مطلوب")
    .min(8, "اسم المستخدم يجب أن يكون أكثر من 8 أحرف")
    .refine(validateUsername, {
      message: "يجب أن يحتوي اسم المستخدم على حروف كبيرة وصغيرة وأرقام",
    }),
  phone: z
    .string()
    .nonempty("رقم الهاتف مطلوب")
    .regex(/^\d+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
    .refine(validateLibyanPhoneNumber, {
      message: "يجب أن يكون رقم الهاتف مكونًا من 10 أرقام",
    }),
  email: z
    .string()
    .nonempty("البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صالح"),
});

export type AddUserType = z.infer<typeof AddUserSchema>;
export type EditUserType = z.infer<typeof EditUserSchema>;
