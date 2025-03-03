declare module "home" {
  import { State } from "state";
  import { IconType } from "react-icons";

  interface CardProps {
    title: string;
    count: number;
    icon: IconType;
    max?: number;
    color?: string;
  }

  interface CollegeData {
    name: string;
    male: number;
    female: number;
    icon: IconType;
  }

  interface FormFieldProps {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
  }

  interface InfoCardProps {
    title: string;
    details: string[];
  }

  interface FacultyStat {
    id: number;
    name: string;
    male_count: number;
    female_count: number;
  }

  interface Statistics {
    total_students: number;
    available_rooms: number;
    pending_requests: number;
    faculty_stats: FacultyStat[];
  }
  interface HomeState extends State {
    statistics: Statistics | null;
    LastActivites: LastActivity;
  }

  interface ReqLastNotification {
    id: number;
    description: string;
    type: string;
  }

  interface ActivityLog {
    id: number;
    description: string;
  }

  interface LastActivity {
    ReqNotifications: ReqLastNotification[];
    RemNotifications: ReqLastNotification[];
    activityLogs: ReqLastNotification[];
  }

  interface FormDataProps {
    FirstName: string;
    MidName: string;
    LastName: string;
    NatNo: string;
    Phone: string;
    Email: string;
    studentID: string;
    nationality: string;
    DOB: string;
  }

  interface FormValues extends FormDataProps {
    [key: string]: string | number | null; // Add other possible types if needed
    city: string;
    gender: string;
    faculty: string;
  }

  interface FormFields {
    birthCertificate: null | File;
    residencyProof: null | File;
    personalPhotos: null | File;
    secondaryCertificate: null | File;
  }

  interface FileInputForm {
    birthCertificate: string;
    residencyProof: string;
    personalPhotos: string;
    secondaryCertificate: string;
  }

  interface DataSelect {
    label: string;
    value: string;
  }
}
