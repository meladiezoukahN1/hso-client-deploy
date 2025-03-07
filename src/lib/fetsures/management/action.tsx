import handleError from "@/hooks/handleError";
import useAxios from "@/hooks/use-axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AcademicSeasonsPostRequest,
  BasicSupervisor2,
  NewRoomList,
  StudentId,
  Students,
} from "mangement";
import {
  Building,
  Advertisements,
  GetSupervisorsResponse,
  GetusersResponse,
  ShowFaculties,
  AddBuilding,
  AcademicSeasons,
  AcademicSeasonsID,
  Facultity,
  Cities,
  EditFormDataStudent,
  EditFormData,
  BuildingInfo,
  BuildingPutRequest,
  AddRoom,
  GetByIdSupervisorResponse,
  SupervisorByid,
  RoomByIdResponse,
} from "mangement";
import { BasicUser } from "next-auth";
import { toast } from "sonner";

export const getFaculties = createAsyncThunk(
  "mangemnt/getFaculties",
  async (): Promise<Facultity[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/faculties");
      return res.data.map((faculty_name: { value: number; label: string }) => {
        return {
          value: faculty_name.value.toString(),
          label: faculty_name.label,
        };
      });
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const getCities = createAsyncThunk(
  "mangemnt/getCities",
  async (): Promise<Cities[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/cities");
      return res.data.map((city: { value: number; label: string }) => {
        return {
          value: city.value.toString(),
          label: city.label,
        };
      });
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const getStudentId = createAsyncThunk(
  "mangemnt/getStudentId",
  async (id: number): Promise<StudentId> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get(`/api/student/${id}`);
      return res.data as StudentId;
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const editStudent = createAsyncThunk(
  "management/editStudent",
  async (editData: EditFormDataStudent, { rejectWithValue }) => {
    const axios = await useAxios({ auth: true });
    try {
      if (!editData.studentID) {
        toast.error(`رقم قيد الطالب غير موجود: ${editData.studentID}`);
        return rejectWithValue({ message: "Student ID is missing" });
      }

      const res = await axios.put("/api/student/" + editData.fileNo, {
        firstname: editData.firstname,
        midname: editData.midname,
        lastname: editData.lastname,
        national_number: editData.national_number,
        DOB: editData.DOB,
        phone: editData.phone,
        email: editData.email,
        fileNo: editData.fileNo,
        faculty_name: Number(editData.faculty_name),
        nationality: Number(editData.nationalityID),
        city: Number(editData.city),
        studentID: editData.studentID,
      });

      return res.data;
    } catch (error) {
      throw handleError(error);
    }
  }
);

// user actions
export const getUsers = createAsyncThunk(
  "mangemnt/getUsers",
  async (): Promise<BasicUser[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get<GetusersResponse>("/api/users");
      return res.data.users;
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const getShowFaculties = createAsyncThunk(
  "management/getShowFaculties",
  async (): Promise<ShowFaculties[]> => {
    const axios = await useAxios({ auth: true });

    try {
      const res = await axios.get("/api/showFaculties");
      return res.data as ShowFaculties[];
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const getAdvertisements = createAsyncThunk(
  "management/getAdvertisements",
  async (): Promise<Advertisements[]> => {
    const axios = await useAxios({ auth: true });

    try {
      const res = await axios.get("/advertisement");
      return res.data as Advertisements[];
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const getStudents = createAsyncThunk(
  "management/getStudents",
  async (): Promise<Students[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/students");
      return res.data as Students[];
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const getAcademicSeasons = createAsyncThunk(
  "management/getAcademicSeasons",
  async (): Promise<AcademicSeasons[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/get-academic-seasons");
      return res.data as AcademicSeasons[];
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const postAcademicSeasons = createAsyncThunk(
  "management/postAcademicSeasons",
  async (newAcademicSeasons: AcademicSeasonsPostRequest) => {
    const axios = await useAxios({ auth: true });

    try {
      const res = await axios.post("/api/academic-seasons", newAcademicSeasons);
      return res.data;
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const postAdvertisement = createAsyncThunk(
  "management/postAdvertisement",
  async (newAdvertisement: { title: string; details: string; image: File }) => {
    const axios = await useAxios({ formData: true, auth: true });
    try {
      const res = await axios.post("/api/advertisement", newAdvertisement);
      return res.data;
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const putAcademicSeasonsID = createAsyncThunk(
  "management/putAcademicSeasonsID",
  async (
    newAcademicSeasonsID: AcademicSeasonsID
  ): Promise<AcademicSeasonsID> => {
    const axios = await useAxios({ auth: true });

    try {
      const res = await axios.put(
        "/api/academic-seasons/" + newAcademicSeasonsID.season_id,
        {
          name: newAcademicSeasonsID.name,
          date: newAcademicSeasonsID.date,
          startDate: newAcademicSeasonsID.startDate,
          endDate: newAcademicSeasonsID.endDate,
        }
      );
      return res.data as AcademicSeasonsID;
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const postAddFaculties = createAsyncThunk(
  "management/postFaculties",
  async (newFaculty: { name: string; semCount: number; image: File }) => {
    const axios = await useAxios({ formData: true, auth: true });
    try {
      const res = await axios.post("/api/addfaculties", newFaculty);
      return res.data;
    } catch (e) {
      return handleError(e);
    }
  }
);

export const getUserById = createAsyncThunk(
  "mangemnt/getUserById",
  async (id: number): Promise<{ user: EditFormData }> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get(`/api/user/${id}`);
      return res.data as { user: EditFormData };
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const disabledUser = createAsyncThunk(
  "mangemnt/disabledUser",
  async (id: number) => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.put(`/api/disable-account/${id}`);
      return res.data;
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const createAccount = createAsyncThunk(
  "mangemnt/createAccount",
  async (userData: {
    username: string;
    email: string;
    phone: string;
    address: string;
    FullName: string;
  }) => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.post("/api/registered", userData);
      return res.data;
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const editUser = createAsyncThunk(
  "mangemnt/editUser",
  async (editData: EditFormData) => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.put("/api/user/" + editData.id, {
        FullName: editData.FullName,
        username: editData.username,
        phone: editData.phone,
        email: editData.email,
      });
      return res.data;
    } catch (e) {
      console.error("Error during API call:", e);
      throw handleError(e);
    }
  }
);

// supervisor actions

export const addSupervisor = createAsyncThunk(
  "mangemnt/addSupervisor",
  async (supervisorData: {
    Fullname: string;
    Email: string;
    Phone: string;
    address: string;
  }) => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.post("/api/supervisor", supervisorData);
      return res.data;
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const getSupervisors = createAsyncThunk(
  "mangemnt/getSupervisors",
  async (): Promise<BasicSupervisor2[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get<GetSupervisorsResponse>("/api/supervisors");
      return res.data.supervisors as BasicSupervisor2[];
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const getSupervisorsById = createAsyncThunk(
  "mangemnt/getSupervisorsById",
  async (id: number): Promise<GetByIdSupervisorResponse> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get(`/api/supervisor/${id}/`);
      return res.data as GetByIdSupervisorResponse;
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const editSupervisor = createAsyncThunk(
  "mangemnt/editSupervisor",
  async (editData: SupervisorByid) => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.put("/api/update-supervisor/" + editData.id, {
        Fullname: editData.Fullname,
        Email: editData.Email,
        Phone: editData.Phone,
        address: editData.address,
      });
      return res.data;
    } catch (e) {
      console.error("Error during API call:", e);
      throw handleError(e);
    }
  }
);

// building actions
export const getBuildings = createAsyncThunk(
  "mangemnt/getBuildings",
  async (): Promise<BuildingInfo[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/building");
      return res.data as BuildingInfo[];
    } catch (e) {
      console.error("Error during API call:", e);
      throw handleError(e);
    }
  }
);

export const addBuilding = createAsyncThunk(
  "mangemnt/addBuilding",
  async (buildingData: AddBuilding) => {
    const axios = await useAxios({ auth: true });
    try {
      const payload = {
        Name: buildingData.Name,
        NumOfRooms: buildingData.NumOfRooms,
        Floors: buildingData.Floors,
        url: buildingData.url,
        supervisors: buildingData.supervisors.map((v) => v.id),
      };

      const res = await axios.post("/api/building/", payload);
      return res.data;
    } catch (e) {
      console.error("Error during API call:", e);
      throw handleError(e);
    }
  }
);

export const showBuilding = createAsyncThunk(
  "mangemnt/showBuilding",
  async (): Promise<Building[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get("/api/showBuildings");
      return res.data as Building[];
    } catch (e) {
      console.error("Error during API call:", e);
      throw handleError(e);
    }
  }
);

export const getBuildingById = createAsyncThunk(
  "mangemnt/getBuildingById",
  async (id: number): Promise<Building> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get(`/api/building/${id}/`);
      return res.data as Building;
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const editBuilding = createAsyncThunk(
  "mangemnt/editBuilding",
  async ({ id, editData }: { id: number; editData: BuildingPutRequest }) => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.put("/api/building/" + id, editData);
      return res.data;
    } catch (e) {
      console.error("Error during API call:", e);
      throw handleError(e);
    }
  }
);

// room actions

export const addRoom = createAsyncThunk(
  "mangemnt/addRoom",
  async (addRoomData: AddRoom) => {
    const axios = await useAxios({ auth: true });
    try {
      const payload = {
        RoomNo: addRoomData.RoomNo.value,
        FloorNo: addRoomData.FloorNo.value,
        MaxResidents: addRoomData.MaxResidents.value,
        buildingID: addRoomData.buildingID.value,
      };
      const res = await axios.post("/api/room/", payload);
      return res.data;
    } catch (e) {
      console.error("Error during API call:", e);
      throw handleError(e);
    }
  }
);

export const getRooms = createAsyncThunk(
  "mangemnt/getRooms",
  async (): Promise<NewRoomList[]> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get(`/api/rooms/`);
      return res.data as NewRoomList[];
    } catch (e) {
      throw handleError(e);
    }
  }
);

export const getRoomsById = createAsyncThunk(
  "mangemnt/getRoomsById",
  async (id: number): Promise<RoomByIdResponse> => {
    const axios = await useAxios({ auth: true });
    try {
      const res = await axios.get(`/api/room/${id}`);
      return res.data as RoomByIdResponse;
    } catch (e) {
      throw handleError(e);
    }
  }
);
