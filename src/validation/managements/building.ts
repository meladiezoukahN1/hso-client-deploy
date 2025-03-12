import { z } from "zod";

const supervisorSchema = z.object({
  id: z.number(),
  FullName: z.string().min(1, "يجب أن يحتوي الاسم على حرف واحد على الأقل"),
});
export const buildingShowSchema = z.object({
  id: z.number().min(1),
  name_building: z.string().nonempty(""),
  count_room_available: z.number(),
  total_rooms: z.number(),
  floors: z.number(),
  count_haunted_room: z.number(),
  supervisor: z
    .array(supervisorSchema)
    .min(1, "يجب ان تحتوي على مشرف واحد على الاقل")
    .max(3, "يجب ان يحتوي المبني على 3 مشرفين كحد اقصي"),
});

export const AddRoomSchema = z.object({
  RoomNo: z.number().min(1, "").max(40, ""),
  FloorNo: z.number().min(1, "").max(10, ""),
  MaxResidents: z.number(),
  buildingID: z.number(),
});

export const AddBuildingSchema = z.object({
  Buildingname: z.string(),
  Numberrooms: z.number(),
  Numberfloors: z.number(),
  url: z.string(),
  supervisors: z
    .array(supervisorSchema)
    .min(1, "يجب ان تحتوي على مشرف واحد على الاقل")
    .max(3, "يجب ان يحتوي المبني على 3 مشرفين كحد اقصي"),
});

export type BuildingShowType = z.infer<typeof buildingShowSchema>;
export type AddRoomType = z.infer<typeof AddRoomSchema>;
export type AddBuildingType = z.infer<typeof AddBuildingSchema>;
