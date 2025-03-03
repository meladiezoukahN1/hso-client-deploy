export const EXPEL_TYPES = [
  {
    label: "مستنفذ",
    value: 1,
  },
  {
    label: "طرد",
    value: 2,
  },
  {
    label: "منقطع",
    value: 3,
  },
] as const;

export const student = {
  id: 1,
  name: "Student One",
  email: "student1@example.com",
  phone: "123456789",
  birthDate: "2000-01-01",
  college: "Engineering",
  nationality: "Libyan",
  city: "City A",
  registrationNumber: "26549",
  nationalID: "119980215487",
  birthCertificate: "شهادة الميلاد",
  residenceCertificate: "شهادة الإقامة",
  highSchoolCertificate: "الشهادة الثانوية",
  personalPhoto: "صورة شخصية",
  files: "الملفات",
  architecture: "العمارة",
  room: "الحجرة",
  floor: "الدور",
  card: "البطاقة",
  fileNumber: "رقم الملف",
};

export const studentSemestersData = [
  {
    id: 1,
    studentId: 123,
    semester: "الأول",
    academicYear: "2021-2022",
    semesterStart: "2021-09-01",
    semesterEnd: "2022-01-31",
  },
  {
    id: 2,
    studentId: 123,
    semester: "الثاني",
    academicYear: "2021-2022",
    semesterStart: "2022-02-01",
    semesterEnd: "2022-06-30",
  },
];


export const studentsRequests2 = {
  studentsRequests: [
    {
      ReqID: 1,
      studentID: "123456",
      gender: "ذكر",
      nationality: "ليبي",
      city: "طرابلس",
      Phone: "0912345678",
      Email: "student1@example.com",
      faculty: "الهندسة",
      documents: [
        {
          DocId: 1,
          FileName: "شهادة الثانوية.pdf",
          FileType: "pdf",
          path: "/files/secondary-certificate.pdf",
        },
      ],
    },
    {
      ReqID: 2,
      studentID: "654321",
      gender: "أنثى",
      nationality: "ليبية",
      city: "بنغازي",
      Phone: "0923456789",
      Email: "student2@example.com",
      faculty: "الطب",
      documents: [
        {
          DocId: 3,
          FileName: "شهادة الثانوية.pdf",
          FileType: "pdf",
          path: "/files/secondary-certificate.pdf",
        },
      ],
    },
  ],
};

export const requst = {
  ReqID: 1,
  studentID: "123456",
  gender: "ذكر",
  nationality: "ليبي",
  city: "طرابلس",
  Phone: "0912345678",
  Email: "student1@example.com",
  faculty: "الهندسة",
  documents: [
    {
      DocId: 1,
      FileName: "شهادة الميلاد",
      FileType: "pdf",
      path: "/files/secondary-certificate.pdf",
    },
    {
      DocId: 2,
      FileName: "شهادة الميلاد",
      FileType: "pdf",
      path: "/files/birth-certificate.pdf",
    },
    {
      DocId: 3,
      FileName: "شهادة الميلاد",
      FileType: "pdf",
      path: "/files/birth-certificate.pdf",
    },
    {
      DocId: 4,
      FileName: "شهادة الميلاد",
      FileType: "pdf",
      path: "/files/birth-certificate.pdf",
    },
  ],
};

export const dataSelect = [
  { value: "0", label: "ذكر" },
  {
    value: "1",
    label: "أنثى",
  },
];

export const columnsStudentDetails = [
  { header: "ر.م", accessor: "index" },
  { header: "الفصل", accessor: "name" },
  { header: "السنة الدراسية", accessor: "date" },
  { header: "بداية السيمستر", accessor: "startDate" },
  { header: "نهاية السيمستر", accessor: "endDate" },
];

export const stateStudentSelect = [
  {
    label: "قيد الدراسة",
    value: "Active",
  },
  {
    label: "تم انتهاء مدة الدراسة",
    value: "Inactive",
  },
];

export const columns = [
  { header: "الاسم", accessor: "full_name" },
  { header: "الكلية", accessor: "faculty_name" },
  { header: "رقم الملف", accessor: "fileNo" },
  { header: "الحالة الدراسية", accessor: "status" },
  { header: "الملف", accessor: "studentID" },
];

