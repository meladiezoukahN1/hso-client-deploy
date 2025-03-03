import { CalendarDate } from "@nextui-org/react";

export const convertDateValueToString = (date: CalendarDate | null): string => {
  if (!date) return "";
  const dateObj = new Date(date.toString());
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const convertDateValueFromString = (
  date: string | null
): CalendarDate | null => {
  if (!date) return null;
  const [year, month, day] = date.split("-").map(Number);
  return { year, month, day } as CalendarDate;
};
