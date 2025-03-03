declare module "student" {
  export interface Room {
    Room_id: number;
    RoomNo: string;
    IsAvailable: number;
    IsFull: number;
    FloorNo: number;
    MaxResidents: number;
    status: number;
    buildingID: number;
  }

  export interface FormData {
    studentId: string;
    building: string;
    floor: string;
    roomId: string;
  }

  export interface CollageSelect {
    label: string;
    value: string;
  }
  export interface RoomState {
    formData: FormData;
    buildings: Building[];
    requestes: Requests[];
    requesteDetails: RequestDestails[];
    studentDetails: StudentDetails;
    loading: boolean;
    error: null | string;
    status: "idle" | "loading" | "succeeded" | "failed";
    student: Students[];
    collage: CollageSelect[];
    info: { message: string };
    activation: string;
    city: {
      label: string;
      value: value;
    }[];
    notifications: NotificationsProp[];
    editRooms: EditRooms;
    page: number;
    limit: number;
    totalPages: number;
    filterStudent: string;
  }

  export interface Building {
    BuildingId: number;
    Name: string;
    NumOfRooms: number;
    Floors: number;
    FloorsData: Floors[];
  }

  export interface Floors {
    FloorNo: number;
    Rooms: Rooms[];
  }

  export interface Rooms {
    Room_id: number;
    RoomNo: string;
    MaxResidents: number;
  }

  export interface FormData {
    studentId: string;
    building: string;
    floor: string;
    roomId: string;
  }

  export interface Students {
    studentID: number;
    full_name: string;
    faculty_name: string;
    fileNo: number;
    status: string;
  }

  export interface ResponseBookRoom {
    status: string;
    message: string;
  }

  export interface Requests {
    ReqID: number;
    name: string;
    DOB: string;
    faculty: number;
  }

  export interface RequestDestails {
    ReqID: number;
    DOB: string;
    full_name: string;
    studentID: string;
    gender: number;
    nationality: number;
    city: string;
    Phone: string;
    Email: string;
    faculty: number;
    documents: {
      DocId: number;
      FileName: string;
      FileType: string;
      path: string;
    }[];
  }

  export interface ExelStuden {
    fileNo: number;
    type: number;
    reason: string;
    file: {
      lastModified: number;
      name: string;
      size: number;
      type: string;
      webkitRelativePath?: string;
    } | null;
  }

  export interface StudentDetails {
    studentID: number;
    firstname: string;
    lastname: string;
    midname: string;
    faculty_name: string;
    fileNo: number;
    status: string;
    DOB: string;
    city: string;
    phone: string;
    email: string;
    room: string;
    semCount: number;
    gender: string;
    passport: string;
    nationality: string;
    national_number: string;
    building: string;
    Floor: string;
    documents: string;
    AcademicSeason: {
      name: string;
      date: string;
      startDate: string;
      endDate: string;
    }[];
  }
  export interface NotificationsProp {
    id: number;
    student_id: null;
    pendingRequest_id: number;
    data: string;
    type: string;
    status: number;
    read_at: string;
    created_at: string;
    updated_at: string;
  }

  export interface EditRooms {
    message: string;
    stauts: "success" | "switch" | "idel";
    data?: {
      value: string;
      label: string;
    };
  }
}
