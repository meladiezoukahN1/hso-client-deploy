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

    Fullname: z
      .string()
      .nonempty("الاسم الكامل مطلوب")
      .regex(/^[\u0600-\u06FF\s]+$/, "يجب أن يكون الاسم باللغة العربية فقط")
      .refine((name) => name.split(/\s+/).length >= 3, {
        message: "يجب أن يحتوي الاسم على 3 أسماء على الأقل",
      })
      .refine((name) => name.split(/\s+/).length <= 6, {
        message: "يجب ألا يحتوي الاسم على أكثر من 6 أسماء",
      }),

    address: z.string(),

    Phone: z.string().nonempty("رقم الهاتف مطلوب"),
    Email: z.string().email("البريد الإلكتروني غير صالح"),
    
  })
  .refine((data) => validateLibyanPhoneNumber(data.Phone), {
    message: "تاكد من صحة رقم الهاتف",
    path: ["phone"],
  });

export type AddSupervisorType = z.infer<typeof AddSupervisorSchema>;
export type EditSuperVisorType = z.infer<typeof EditSuperVisorSchema>;
