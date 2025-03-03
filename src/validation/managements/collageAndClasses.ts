import { z } from "zod";

const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];

export const FacultySchema = z.object({
  name: z.string().min(1, "يجب إدخال اسم الكلية"),
  semCount: z
    .string()
    .min(1, "يجب إدخال عدد الفصول الدراسية")
    .refine(
      (value) => {
        const num = Number(value);
        return num >= 8 && num <= 14;
      },
      { message: "يجب أن يكون عدد الفصول الدراسية من 8 إلى 14" }
    ),
  image: z
    .instanceof(File)
    .refine((file) => file && allowedImageTypes.includes(file.type), {
      message: "يجب أن يكون الملف من نوع صورة (JPEG, PNG, JPG)",
    }),
});

export type FacultyFormData = z.infer<typeof FacultySchema>;
