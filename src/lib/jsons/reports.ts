import { TypesOfReports } from "reports";

export const columnsBuilding = [
  { header: "ت.ر", accessor: "serial_number" },
  { header: "رقم الملف", accessor: "file_no" },
  { header: "الغرفة", accessor: "room_name" },
  { header: "الطابق", accessor: "room_floor" },
  { header: "حالة الغرفة", accessor: "room_status" },
];

export const typeOfReports: TypesOfReports[] = [
  {
    title: "تقرير المدن",
    path: "study-report",
  },
  {
    title: "تقرير المباني و الغرف",
    path: "students-report",
  },
  {
    title: "تقرير مستنفذي مدة الدراسة",
    path: "city-report",
  },
];

export const genderOptions = [
  { value: "ذكر", label: "ذكر" },
  { value: "أنثى", label: "أنثى" },
];

export const selectRoomStateDataReports = [
  {
    label: "ممتلئة",
    value: "full",
  },
  {
    label: "تحت الصيانة",
    value: "underMaintenance",
  },
  {
    label: "شاغرة",
    value: "vacant",
  },
];

export const selectStateDataReports = [
  {
    label: "استنفد",
    value: "false",
  },
  {
    label: "على وشك الاستنفاد",
    value: "true",
  },
];

export const academic_season = [
  {
    label: "ربيع",
    value: "ربيع",
  },
  {
    label: "خريف",
    value: "خريف",
  },
];
export const DurationExhausted = [
  {
    label: "فصل",
    value: "فصل",
  },
  {
    label: "فصلين",
    value: "فصلين",
  },
  {
    label: "3 فصول",
    value: "3 فصول",
  },
  {
    label: "4 فصول",
    value: "4 فصول",
  },
  {
    label: "5 فصول",
    value: "5 فصول",
  },
  {
    label: "6 فصول",
    value: "6 فصول",
  },
  {
    label: "7 فصول",
    value: "7 فصول",
  },
  {
    label: "8 فصول",
    value: "8 فصول",
  },
  {
    label: "9 فصول",
    value: "9 فصول",
  },
  {
    label: "10 فصول",
    value: "10 فصول",
  },
];

export const selectPeriodeOfStudyDataReports = [
  {
    label: "فصل",
    value: "1",
  },
  {
    label: "فصلين",
    value: "2",
  },
  {
    label: "ثلاثة فصول",
    value: "3",
  },
  {
    label: "اربعة فصول",
    value: "4",
  },
];

export const tabs = [
  {
    label: "تقرير المدن",
    value: "city-report",
  },
  {
    label: "تقرير الغرف و المباني",
    value: "building-report",
  },
  {
    label: "تقرير مستنفذي مدة الدراسة",
    value: "study-period-report",
  },
];

export const data = [
  {
    fileNumber: 105,
    studentName: "سالم محمود أحمد",
    studentId: "20000",
    year: "2018",
    semester: "خريف",
    college: "IT",
    status: "استنفد",
    remaining: "9 فصول",
    statusColor: "bg-red-500",
    index: 1,
  },
];

export const cities = [
  { name: "بنغازي", value: 200 },
  { name: "مصراتة", value: 150 },
  { name: "مسلاته", value: 80 },
  { name: "بن وليد", value: 40 },
  { name: "الجبل الأخضر", value: 15 },
  { name: "زليطن", value: 4 },
];

export const columnsCityStudents = [
  { header: "ت.ق ", accessor: "index" },
  { header: "رقم الملف", accessor: "fileNo" },
  { header: "اسم الطالب", accessor: "full_name" },
  { header: "رقم القيد", accessor: "studentID" },
  { header: "المدينة", accessor: "city_name" },
  { header: "الجنس", accessor: "gender" },
  { header: "المبنى", accessor: "building_name" },
  { header: "الغرفة", accessor: "room_name" },
  { header: "الكلية", accessor: "faculty_name" },
];

export const studentData = [
  {
    fileNo: 101,
    full_name: "سالم محمود أحمد",
    studentID: "20000",
    city_name: "بنغازي",
    gender: "ذكر",
    building_name: "E1",
    room_name: "7",
    faculty_name: "IT",
  },
];
export const columnsPeriodOfStudy = [
  { header: "رقم الملف", accessor: "fileNo" },
  { header: "اسم الطالب", accessor: "studentName" },
  { header: "الكلية", accessor: "facultyName" },
  { header: "رقم القيد", accessor: "studentID" },
  { header: "السنة الدراسية", accessor: "academicSeason" },
  { header: "الحالة", accessor: "status" },
  { header: "المدة المستنفدة", accessor: "remainingSemesters" },
];

export const columnsStudents = [
  { header: "ت.ق ", accessor: "id" },
  { header: "الاسم ", accessor: "studentName" },
  { header: " المدينة", accessor: "studentId" },
  { header: "الجنس ", accessor: "year" },
  { header: "المبنى", accessor: "semester" },
  { header: "الغرفة", accessor: "college" },
  { header: "الكلية", accessor: "statusColor" },
  { header: "رقم القيد ", accessor: "remaining" },
  { header: "رقم الملف ", accessor: "fileNumber" },
];
