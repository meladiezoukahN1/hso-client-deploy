declare module "mangement" {
  export interface MangementState {
    user: IUser;
    faculties: Facultity[];
    buildings: IBuilding;
    supervisors: ISupervisor;
    rooms: IRoom;
    roomSelected: RoomA | null;
    isLoading: boolean;
    RoomPutRequest: RoomPutRequest;
    error: string | null;
    selectBuilding: Select[];
    getRoomsSelect: Select[];
  }

  import { Facultity } from "./mangement.d";

  import { Dispatch, SetStateAction } from "react";
  export interface Facultity {
    id: number;
    name: string;
    image: string;
  }

  interface Select {
    value: number;
    label: string;
  }

  interface FormData {
    facultityTitle: string;
    facultityDetails: string;
    facultityImage: File | null;
  }

  interface Cities {
    value: number;
    label: string;
  }

  interface StudentId {
    firstname: string;
    midname: string;
    lastname: string;
    national_number: number;
    DOB: string;
    phone: string;
    email: string;
    fileNo: number;
    faculty_name: string;
    nationality: string;
    nationalityID: number;
    city: string;
    studentID: number;
    facultyID: string;
    city_id: string;
  }

  export interface CardProps {
    title: string;
    url: string;
  }
  export interface FormField {
    value: string | number;
    isVaild: boolean;
  }

  interface EditStates {
    fullName: boolean;
    username: boolean;
    phone: boolean;
    email: boolean;
    address: boolean;
    [key: string]: boolean;
  }

  // user interfaces

  interface IUser {
    userlist: BasicUser[];
    userSelected: EditFormData | null;
  }
  export interface FormDataUser {
    FullName: FormField;
    username: FormField;
    phone: FormField;
    address: FormField;
    email: FormField;
    role: FormField;
  }

  // spuervisor interfaces

  interface ISupervisor {
    supervisorList: BasicSupervisor2[];
    supervisorSelected: GetByIdSupervisorResponse | null;
  }
  interface ShowFaculties {
    value: string;
    label: number;
    image: string;
    semCount: number;
  }

  export interface addFaculty {
    name: string;
    semCount: string;
    image: string;
    updated_at: string;
    created_at: string;
    id: number;
  }

  export interface Advertisements {
    id: number;
    title: string;
    details: string;
    image: string;
    created_at: string;
    updated_at: string;
  }

  interface FormData {
    advertisementTitle: string;
    advertisementDetails: string;
    advertisementImage: File | null;
    createdAt: string;
    updatedAt: string;
  }

  interface AcademicSeasons {
    season_id?: number;
    faculty_name: string;
    name: string;
    date: string;
    startDate: string;
    endDate: string;
  }

  interface AcademicSeasonsPostRequest {
    faculty_id: number;
    name: string;
    date: string;
    startDate: string;
    endDate: string;
  }

  interface AcademicSeasonsID {
    season_id?: number;
    faculty_name: string;
    name: string;
    date: string;
    startDate: string;
    endDate: string;
  }

  interface Students {
    studentID: number;
    full_name: string;
    faculty_name: string;
    fileNo: number;
    status: string;
  }

  interface SelectProps {
    value: string;
    label: string;
  }

  interface FormSupervisor {
    value: string;
    isVaild: boolean;
  }

  export interface AddSupervisor {
    Fullname: FormSupervisor;
    Email: FormSupervisor;
    Phone: FormSupervisor;
    address: FormSupervisor;
  }

  interface AddUser {
    username: string;
    email: string;
    phone: string;
    address: string;
    FullName: string;
    password: string;
    IsAdmin: number;
    IsActive: number;
  }
  interface BasicSupervisor {
    id: number;
    name: string;
  }

  interface BasicSupervisor2 {
    id: string;
    FullName: string;
  }

  interface Supervisor {
    id: number;
    FullName: string;
    Email: string;
    Phone: string;
    address: string;
    Building: number;
  }

  interface SupervisorByid {
    BuildingId?: number;
    id: number;
    Fullname: string;
    Email: string;
    Phone: string;
    address: string;
  }

  interface GetByIdSupervisorResponse {
    supervisor: SupervisorByid;
  }
  export interface MangementState extends State {
    faculties: Facultity[];
    status: "idle" | "loading" | "succeeded" | "failed";
    userlist: BasicUser[];
    students: Students[];
    StudentId: StudentId;
    addFaculty: AddFaculty[];
    AcademicSeasonsID: AcademicSeasonsID[];
    academicSeasons: AcademicSeasons[];
    ShowFaculties: ShowFaculties[];
    userSelected: User | null;
    userSelected: EditFormData | null;
    buildings: Building[];
    cities: Cities[];
    advertisements: Advertisements[];
    supervisors: WritableDraft<Supervisor>[];
  }

  interface EditableFieldProps {
    label: string;
    name: string;
    formData: Formdata;
    editStates: EditStates;
    setEditStates: SetEditStates;
    setFormData: Dispatch<SetStateAction<FormData>>;
  }

  interface EditFormData {
    id: number;
    FullName: string;
    username: string;
    phone: string;
    email: string;
  }

  export interface EditFormDataStudent {
    studentID: number;
    firstname: string;
    midname: string;
    lastname: string;
    fileNo?: number;
    faculty_name: string;
    national_number: string;
    nationality: string;
    nationalityID: number;
    email: string;
    phone: string;
    city: string;
    DOB: string;
    studentID: number;
  }

  // building interfaces

  interface IBuilding {
    buildingList: Building[];
    buildingSelected: Building | null;
    bulidingInfoList: BuildingInfo[];
  }

  interface Building {
    id: number;
    name_building: string;
    floors: number;
    total_rooms: number;
    count_room_available: number;
    count_haunted_room: number;
    supervisor: BasicSupervisor[];
    supervisor: BasicSupervisor2[];
    url: string;
  }

  export interface AddBuilding {
    Name: string;
    NumOfRooms: number;
    Floors: number;
    url: string;
    supervisors: {
      id: number;
      FullName: string;
    }[];
  }

  interface BuildingInfo {
    BuildingId: number;
    Name: string;
    NumOfRooms: number;
    Floors: number;
    FloorsData: Floor[];
  }

  interface BuildingPutRequest {
    name_building: string;
    floors: number;
    supervisors: number[];
  }

  export interface Facultity {
    id: number;
    name: string;
  }

  // interfcae for api response
  interface GetSupervisorsResponse {
    supervisors: BasicSupervisor2[];
  }

  interface GetusersResponse {
    users: users[];
  }

  interface GetBuildingsResponse {
    buildings: Building[];
  }

  interface GetBuildingsResponseInfo {
    buildings: BuildingInfo[];
  }

  interface RoomA {
    Room_id: number;
    IsAvailable: number;
    IsFull: number;
    FloorNo: number;
    MaxResidents: number;
    status: number;
    BulidingName: string;
    RoomNo: string;
    BuildingId: number;
    Room_id: number;
    students: RoomStudent[];
  }

  // interface EditRoom

  interface RoomStudent {
    fullname: string;
    fileNo: number;
    facultyName: string;
  }

  // rooms interfaces
  interface Room {
    Room_id: number;
    RoomNo: string;
    MaxResidents: number;
  }

  interface Floor {
    FloorNo: number;
    Rooms: Room[];
  }

  interface GetRoomsResponse {
    Rooms: RoomA[];
  }

  interface IRoom {
    roomsList: RoomA[];
    roomSelectList: NewRoomList[];
  }

  interface AddRoom {
    RoomNo: number;
    FloorNo: number;
    MaxResidents: number;
    buildingID: string;
  }
  interface NewRoomList {
    value: number;
    label: string;
    buildingId: number;
  }

  interface RoomByIdResponse {
    room: RoomA[];
  }
  interface RoomPutRequest {
    RoomNo: string;
    FloorNo: number;
    MaxResidents: number;
  }

  interface EditRoom {
    id: number;
    RoomNo: string;
    FloorNo: number;
    MaxResidents: number;
  }
}
