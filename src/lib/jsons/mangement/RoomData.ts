import { useState } from "react";

export function useRoomData() {
  const [roomData, setRoomData] = useState([
    { fileNumber: "110", faculty: "قانون", name: "عبدالباقي" },
    { fileNumber: "111", faculty: "هندسة", name: "محمد" },
    { fileNumber: "112", faculty: "طب", name: "علي" },
  ]);

  return { roomData, setRoomData };
}

export const data = [
  {
    label: "بنغازي",
    value: "bengazey",
  },
  {
    label: "مزدة",
    value: "mezda",
  },
  {
    label: "مسلاته",
    value: "maslata",
  },
];

export const studentsRequests = [
  {
    id: 1,
    name: "Student One",
    email: "student1@example.com",
    phone: "123456789",
    birthDate: "2000-01-01",
    college: "Engineering",
    nationality: "Country A",
    city: "City A",
    registrationNumber: "12345",
    nationalID: "987654321",
    birthCertificate: "شهادة الميلاد",
    residenceCertificate: "شهادة الإقامة",
    highSchoolCertificate: "الشهادة الثانوية",
    personalPhoto: "صورة شخصية",
  },
  {
    id: 2,
    name: "Student Two",
    email: "student2@example.com",
    phone: "987654321",
    birthDate: "2001-02-02",
    college: "Science",
    nationality: "Country B",
    city: "City B",
    registrationNumber: "67890",
    nationalID: "123456789",
    birthCertificate: "شهادة الميلاد",
    residenceCertificate: "شهادة الإقامة",
    highSchoolCertificate: "الشهادة الثانوية",
    personalPhoto: "صورة شخصية",
  },
];
