import { createSlice } from "@reduxjs/toolkit";
import {
  BookRoom,
  fetchBuildings,
  getStudent,
  PendingRequests,
  Collage,
  ExpelStudent,
  PendingRequest,
  Student,
  ActiveStudent,
  ApproveRequest,
  RejectRequest,
  cities,
  Notafaction,
  MoveStudent,
  SwitchRoomStudent,
} from "./action";
import { RoomState } from "student";
import { toast } from "sonner";

const initialState: RoomState = {
  formData: {
    studentId: "",
    building: "",
    floor: "",
    roomId: "",
  },
  city: [],
  activation: "",
  buildings: [],
  studentDetails: {
    Floor: "",
    building: "",
    studentID: 0,
    firstname: "",
    lastname: "",
    midname: "",
    faculty_name: "",
    fileNo: 0,
    status: "",
    DOB: "",
    city: "",
    phone: "",
    email: "",
    room: "",
    semCount: 0,
    gender: "",
    passport: "",
    nationality: "",
    national_number: "",
    AcademicSeason: [],
    documents: "",
  },
  requesteDetails: [],
  requestes: [],
  student: [],
  loading: false,
  error: null,
  status: "idle",
  collage: [],
  info: { message: "" },
  notifications: [],
  editRooms: {
    message: "",
    stauts: "idel",
  },
  page: 1,
  limit: 10,
  totalPages: 1,
  filterStudent: "",
};

const StudentReducer = createSlice({
  name: "students",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      state.filterStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuildings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuildings.fulfilled, (state, action) => {
        state.loading = false;
        state.buildings = action.payload;
      })
      .addCase(fetchBuildings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(getStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload;
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // get students
      .addCase(Student.pending, (state) => {
        state.loading = true;
      })
      .addCase(Student.fulfilled, (state, action) => {
        state.loading = false;
        state.studentDetails = action.payload;
      })
      .addCase(Student.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(BookRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(BookRoom.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action.payload.message.includes("400")) {
          state.error = "الطالب بالفعل مسجل في غرفة";
        } else {
          toast.success("تم حجز الغرفة بنجاح");
        }
      })
      .addCase(BookRoom.rejected, (state) => {
        state.status = "failed";
      })

      // pending requests
      .addCase(PendingRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(PendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requestes = action.payload;
      })
      .addCase(PendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // pending request
      .addCase(PendingRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(PendingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requesteDetails = action.payload;
      })
      .addCase(PendingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // get collage
      .addCase(Collage.pending, (state) => {
        state.loading = true;
      })
      .addCase(Collage.fulfilled, (state, action) => {
        state.loading = false;
        state.collage = action.payload;
      })
      .addCase(Collage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // expel student
      .addCase(ExpelStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ExpelStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.info = action.payload;
        toast.success("تم إلغاء تسجيل الطالب بنجاح!");
      })
      .addCase(ExpelStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      // active and deactive
      .addCase(ActiveStudent.pending, () => {})
      .addCase(ActiveStudent.fulfilled, (state, action) => {
        state.info = action.payload;
        toast.success(
          action.payload.message === "Student activated successfully"
            ? "تم تفعيل الطالب بنجاح"
            : "تم إلغاء تفعيل الطالب بنجاح"
        );
      })
      .addCase(ActiveStudent.rejected, (state, action) => {
        state.error = action.error.message || null;
      })

      // approve request
      .addCase(ApproveRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ApproveRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.info = action.payload;
        toast.success("تم قبول الطالب بنجاح");
      })
      .addCase(ApproveRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        toast.success("يوجد خطا في بيانات الطالب");
      })

      // reject request
      .addCase(RejectRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(RejectRequest.fulfilled, (state) => {
        state.loading = false;
        toast.success("تم رفض الطالب بنجاح");
      })
      .addCase(RejectRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        toast.error(`${state.error + " " + action.payload}`);
      })

      // get cities
      .addCase(cities.pending, (state) => {
        state.loading = true;
      })
      .addCase(cities.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload;
      })
      .addCase(cities.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })

      // notifactions
      .addCase(Notafaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(Notafaction.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(Notafaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // edit room
      .addCase(MoveStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(MoveStudent.fulfilled, (state, action) => {
        state.editRooms = action.payload;
        state.status = "succeeded";
        toast.success("تم بتديل الغرف بنجاح");
      })
      .addCase(MoveStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        toast.error(`${state.error}`);
      })

      // switch
      .addCase(SwitchRoomStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SwitchRoomStudent.fulfilled, (state, action) => {
        state.editRooms = action.payload;
        state.status = "succeeded";
        toast.success("تم بتديل الغرف بنجاح");
      })
      .addCase(SwitchRoomStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
        toast.error(`${state.error}`);
      });
  },
});

export const { setPage, setFilters } = StudentReducer.actions;
export default StudentReducer.reducer;
