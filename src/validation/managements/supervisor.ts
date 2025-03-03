import validateLibyanPhoneNumber from "@/hooks/validate-phone";
import { z } from "zod";

export const AddSupervisorSchema = z
  .object({
    Fullname: z
      .string()
      .nonempty("الاسم الثلاثي مطلوب")
      .regex(/^[\u0600-\u06FF\s]+$/, "يجب أن يكون الاسم باللغة العربية فقط")
      .refine((name) => name.split(/\s+/).length >= 3, {
        message: "يجب أن يحتوي الاسم على 3 أسماء على الأقل",
      })
      .refine((name) => name.split(/\s+/).length <= 6, {
        message: "يجب ألا يحتوي الاسم على أكثر من 6 أسماء",
      }),
    Phone: z.string().nonempty("رقم الهاتف مطلوب").max(14),
    address: z.string().nonempty("العنوان مطلوب"),
    Email: z
      .string()
      .nonempty("البريد الإلكتروني مطلوب")
      .email("البريد الإلكتروني غير صالح"),
  })
  .refine((data) => validateLibyanPhoneNumber(data.Phone), {
    message: "تاكد من صحة رقم الهاتف",
    path: ["Phone"],
  });

// export const EditSuperVisorSchema = z.object({
//   username: z.string(),
//   email: z.string().email(),
//   phone: z.string(),
//   FullName: z.string(),
//   id: z.number(),
// });

export const EditSuperVisorSchema = z
  .object({
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
      .regex(/^[A-Za-z]+$/, "يجب أن يحتوي اسم المستخدم على حروف إنجليزية فقط")
      .min(6, "يجب أن يحتوي اسم المستخدم على 6 أحرف على الأقل")
      .refine((username) => /[a-z]/.test(username) && /[A-Z]/.test(username), {
        message: "يجب أن يحتوي اسم المستخدم على حروف كبيرة وصغيرة",
      }),

    phone: z.string().nonempty("رقم الهاتف مطلوب"),
    email: z.string().email("البريد الإلكتروني غير صالح"),
  })
  .refine((data) => validateLibyanPhoneNumber(data.phone), {
    message: "تاكد من صحة رقم الهاتف",
    path: ["phone"],
  });

export type AddSupervisorType = z.infer<typeof AddSupervisorSchema>;
export type EditSuperVisorType = z.infer<typeof EditSuperVisorSchema>;
