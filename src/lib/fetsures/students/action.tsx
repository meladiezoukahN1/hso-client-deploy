import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "@/hooks/use-axios";
import {
  Building,
  Students,
  ResponseBookRoom,
  Requests,
  CollageSelect,
  ExelStuden,
  StudentDetails,
  RequestDestails,
  NotificationsProp,
} from "student";
import handleError from "@/hooks/handleError";

export const fetchBuildings = createAsyncThunk(
  "students/getRooms",
  async (): Promise<Building[]> => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.get("/api/buildings");
      return res.data.buildings as Building[];
    } catch (error) {
      throw error;
    }
  }
);

export const getStudent = createAsyncThunk(
  "students/students",
  async (): Promise<Students[]> => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.get(`/api/students`);
      return res.data as Students[];
    } catch (error) {
      throw error;
    }
  }
);

export const BookRoom = createAsyncThunk(
  "students/bookRoom",
  async ({
    roomId,
    id,
  }: {
    roomId: string;
    id: number;
  }): Promise<ResponseBookRoom> => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.post(`/api/room/addstudent/${id}`, {
        roomid: roomId,
      });
      return res.data as ResponseBookRoom;
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const PendingRequests = createAsyncThunk(
  "students/pending-requests",
  async (): Promise<Requests[]> => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.get("/api/pending-requests");
      return res.data as Requests[];
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const PendingRequest = createAsyncThunk(
  "students/pending-request",
  async (id: number): Promise<RequestDestails[]> => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.get(`api/pending-request/${id}`);
      return res.data as RequestDestails[];
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const Collage = createAsyncThunk(
  "students/get-collage",
  async (): Promise<CollageSelect[]> => {
    try {
      const axios = await useAxios();
      const res = await axios.get("/getFaculties");
      return res.data as CollageSelect[];
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const ExpelStudent = createAsyncThunk(
  "student/expelStudent",
  async (formData: ExelStuden) => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.post(`/api/suspended`, formData);
      return res.data;
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const Student = createAsyncThunk(
  "student/get-Spcific-student",
  async (id: number) => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.get(`/api/student/${id}`);
      return res.data as StudentDetails;
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const ActiveStudent = createAsyncThunk(
  "student/active",
  async ({ id, active }: { id: number; active: string }) => {
    try {
      const api: string =
        active === "Active" ? `/api/deactivate/${id}` : `/api/activate/${id}`;
      const axios = await useAxios({ auth: true });
      const res = await axios.post(api);
      return res.data as { message: string };
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const ApproveRequest = createAsyncThunk(
  "student/approveRequest",
  async (id: number) => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.post(`/api/approve/${id}`);
      return res.data;
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const RejectRequest = createAsyncThunk(
  "student/rejectRequest",
  async ({ id, reason }: { id: number; reason: string }) => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.post(`/api/deny/${id}`, { reason: reason });
      return res.data;
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const cities = createAsyncThunk("student/cities", async () => {
  try {
    const axios = await useAxios();
    const res = await axios.get("/cities");
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
});

export const Notafaction = createAsyncThunk(
  "sudent/notafaction",
  async (): Promise<NotificationsProp[]> => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.get("/api/notifications");
      return res.data as NotificationsProp[];
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const MoveStudent = createAsyncThunk(
  "student/moveStudent",
  async ({ fileNo, roomID }: { fileNo: number; roomID: number }) => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.put(`/api/moveroom/${fileNo}?roomID=${roomID}`);
      return res.data;
    } catch (error) {
      throw handleError(error);
    }
  }
);

export const SwitchRoomStudent = createAsyncThunk(
  "student/switchRoomStudent",
  async ({ id, fileNo }: { id: number; fileNo: number }) => {
    try {
      const axios = await useAxios({ auth: true });
      const res = await axios.put(`/api/transferroom/${id}?fileNo=${fileNo}`);
      return res.data;
    } catch (error) {
      throw handleError(error);
    }
  }
);
