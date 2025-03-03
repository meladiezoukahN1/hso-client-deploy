import { createSlice } from "@reduxjs/toolkit";
import { MangementState } from "mangement";
import {
  getFaculties,
  getUserById,
  getUsers,
  getAdvertisements,
  showBuilding,
  getSupervisorsById,
  getShowFaculties,
  addBuilding,
  getStudents,
  postAddFaculties,
  getAcademicSeasons,
  getStudentId,
  putAcademicSeasonsID,
  postAcademicSeasons,
  getCities,
  editUser,
  getBuildings,
  getBuildingById,
  editBuilding,
  getSupervisors,
  addRoom,
  editSupervisor,
  getRooms,
  createAccount,
  addSupervisor,
  postAdvertisement,
  editStudent,
  disabledUser,
  getRoomsById,
} from "./action";
import { toast } from "sonner";

const initialState: MangementState = {
  error: null,
  faculties: [],
  status: "idle",
  addFaculty: [],
  advertisements: [],
  students: [],
  ShowFaculties: [],
  StudentId: {
    firstname: "",
    midname: "",
    lastname: "",
    national_number: 0,
    DOB: "",
    phone: "",
    email: "",
    fileNo: 0,
    faculty_name: "",
    nationality: "",
    nationalityID: 0,
    city: "",
    studentID: 0,
    city_id: "",
    facultyID: "",
  },
  AcademicSeasonsID: [],
  userlist: [],
  academicSeasons: [],
  userSelected: null,
  // supervisors: [],
  // buildings: [],
  cities: [], // Add this line
  isLoading: false,
  user: {
    userlist: [],
    userSelected: null,
  },
  supervisors: {
    supervisorList: [],
    supervisorSelected: null,
  },
  buildings: {
    buildingList: [],
    buildingSelected: null,
    bulidingInfoList: [],
  },
  // faculties: [],
  rooms: {
    roomsList: [],
    roomSelectList: [],
  },
  roomSelected: null,
};

const managementSlice = createSlice({
  name: "management",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFaculties.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.faculties = action.payload;
      })
      .addCase(getFaculties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFaculties.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })

      .addCase(postAdvertisement.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.StudentId = action.payload;
        toast.success("تم تحميل الملف");
      })
      .addCase(postAdvertisement.pending, (state) => {
        state.isLoading = true;
        toast.loading("يتم تحميل الاعلان");
      })
      .addCase(postAdvertisement.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })

      .addCase(getStudentId.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.StudentId = action.payload;
      })
      .addCase(getStudentId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentId.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
      })
      .addCase(getCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })

      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.students = action.payload;
      })
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })

      .addCase(getAcademicSeasons.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.academicSeasons = action.payload;
      })
      .addCase(getAcademicSeasons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAcademicSeasons.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })

      .addCase(putAcademicSeasonsID.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.AcademicSeasonsID = Array.isArray(action.payload)
          ? action.payload
          : [];
        toast.success("تم جلب بيانات الفصول");
      })
      .addCase(putAcademicSeasonsID.pending, (state) => {
        state.isLoading = true;
        toast.loading(" جاري جلب بيانات الفصول");
      })
      .addCase(putAcademicSeasonsID.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })

      .addCase(postAddFaculties.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.dismiss();
        state.faculties = action.payload;
        toast.success("تم إضافة الكلية بنجاح");
      })
      .addCase(postAddFaculties.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postAddFaculties.rejected, (state, action) => {
        state.status = "failed";
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })

      .addCase(getShowFaculties.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.faculties = action.payload;
      })
      .addCase(getShowFaculties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShowFaculties.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })

      .addCase(postAcademicSeasons.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.faculties = action.payload;
        toast.success("تعديل تم ");
      })
      .addCase(postAcademicSeasons.pending, (state) => {
        state.isLoading = true;
        toast.loading("جاري تعديل الكليات");
      })
      .addCase(postAcademicSeasons.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })

      .addCase(getAdvertisements.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.advertisements = action.payload;
        toast.success("تم جلب البيانات");
      })
      .addCase(getAdvertisements.pending, (state) => {
        state.isLoading = true;
        toast.loading("جاري جلب البيانات");
      })
      .addCase(getAdvertisements.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.user.userlist = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.user.userSelected = action.payload.user;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error(action.error.message || "");
      })
      .addCase(editUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editUser.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("تم تعديل المستخدم بنجاح");
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        toast.dismiss();
        state.error = action.error.message || "حدث خطأ أثناء تعديل المستخدم";
        toast.error(state.error);
      })

      .addCase(createAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAccount.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("تم إضافة المستخدم بنجاح");
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = `${action.payload}`;
        } else {
          state.error = `${action.error.message}`;
        }
      })

      .addCase(addSupervisor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSupervisor.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("تم إضافة المستخدم بنجاح");
      })
      .addCase(addSupervisor.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = `${action.payload}`;
        } else {
          state.error = `${action.error.message}`;
        }
      })

      // building actions
      .addCase(showBuilding.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.buildings.buildingList = action.payload;
      })
      .addCase(showBuilding.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showBuilding.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
      })
      .addCase(addBuilding.pending, (state) => {
        state.isLoading = true;
        toast.loading("جاري إضافة المبنى...");
      })
      .addCase(addBuilding.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("تم إضافة المبنى بنجاح!");
      })
      .addCase(addBuilding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "حدث خطأ أثناء إضافة المبنى";
        toast.error(state.error);
      })
      .addCase(getBuildings.pending, (state) => {
        state.isLoading = true;
        toast.loading("جاري جلب بيانات المباني");
      })
      .addCase(getBuildings.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.buildings.bulidingInfoList = action.payload;
        toast.success("تم جلب بيانات المباني");
      })
      .addCase(getBuildings.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
      })
      .addCase(getBuildingById.pending, (state) => {
        state.isLoading = true;
        toast.loading("جاري جلب بيانات المبنى");
      })
      .addCase(getBuildingById.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.buildings.buildingSelected = action.payload;
        toast.success("تم جلب بيانات المبنى");
      })
      .addCase(getBuildingById.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
        toast.error("فشل في جلب بيانات المبنى");
      })
      .addCase(editBuilding.pending, (state) => {
        state.status = "loading";
        toast.loading("جاري تعديل المبنى...");
      })
      .addCase(editBuilding.fulfilled, (state) => {
        state.status = "succeeded";
        toast.dismiss();
        toast.success("تم تعديل المبنى بنجاح!");
      })
      .addCase(editBuilding.rejected, (state, action) => {
        state.status = "failed";
        toast.dismiss();
        state.error = action.error.message || "حدث خطأ أثناء تعديل المبنى";
        toast.error(state.error);
      })

      // supervisors actions
      .addCase(getSupervisorsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupervisorsById.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.supervisors.supervisorSelected = action.payload;
      })
      .addCase(getSupervisorsById.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
      })
      .addCase(getSupervisors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupervisors.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.supervisors.supervisorList = action.payload;
      })
      .addCase(editSupervisor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSupervisor.fulfilled, (state) => {
        state.isLoading = false;
        toast.dismiss();
        toast.success("تم تعديل المشرف بنجاح!");
      })
      .addCase(editSupervisor.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "حدث خطأ أثناء تعديل المشرف";
        toast.error(state.error);
      })
      .addCase(getSupervisors.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
      })
      // rooms actions
      .addCase(addRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRoom.fulfilled, (state) => {
        state.isLoading = false;
        toast.dismiss();
        toast.success("تم إضافة الغرفة بنجاح!");
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "حدث خطأ أثناء اضافة الغرفة";
        toast.error(state.error);
      })

      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.rooms.roomSelectList = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
      })

      .addCase(editStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editStudent.fulfilled, (state) => {
        state.status = "succeeded";
        toast.dismiss();
        // state.rooms.roomsList = action.payload.Rooms;
      })
      .addCase(editStudent.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(disabledUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(disabledUser.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("تم تعطيل المستخدم بنجاح");
      })
      .addCase(disabledUser.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = `${action.payload}`;
        } else {
          state.error = `${action.error.message}`;
        }
      })
      .addCase(getRoomsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoomsById.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.roomSelected = action.payload;
      })
      .addCase(getRoomsById.rejected, (state, action) => {
        state.isLoading = false;
        toast.dismiss();
        state.error = action.error.message || "";
      });
  },
});

export default managementSlice.reducer;
