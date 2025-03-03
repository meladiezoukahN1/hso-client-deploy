import { z } from "zod";

// تعريف schema باستخدام zod
export const AdvertisementSchema = z.object({
  advertisementTitle: z.string().min(1, "يجب إدخال عنوان الإعلان"),
  advertisementDetails: z.string().min(1, "يجب إدخال تفاصيل الإعلان"),
  advertisementImage: z
    .instanceof(File)
    .refine((file) => file && ["image/png", "image/jpeg"].includes(file.type), {
      message: "يجب تحميل الصور فقط بصيغة PNG أو JPEG",
    })
    .refine((file) => file && file.size <= 2 * 1024 * 1024, {
      message: "يجب أن يكون حجم الملف أقل من 2 ميجابايت",
    }),
});

export type AdvertisementFormData = z.infer<typeof AdvertisementSchema>;
