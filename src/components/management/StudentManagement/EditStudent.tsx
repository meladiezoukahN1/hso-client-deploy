"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEdit, FaSave } from "react-icons/fa";
import {
  getStudentId,
  editStudent,
  getCities,
  getFaculties,
} from "@/lib/fetsures/management/action";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import SelectValueComponents from "@/components/ui/SelectValue";
import { nationalityID } from "@/lib/jsons/mangement/students";
import GeneralDailog from "@/components/ui/GeneralDailog";
import { validateArabicOnly } from "@/hooks/validation-text";
import { toast } from "sonner";
import validateEmail from "@/hooks/validate-email";
import validateLibyanPhoneNumber from "@/hooks/validate-phone";
import validateNationalID from "@/hooks/validateNationalID";
import DailogLoading from "@/components/ui/DailogLoading";
import LoadingIcon from "@/components/ui/LoadingIcon";

function EditStudent() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { StudentId, cities, faculties, isLoading, status, error } =
    useAppSelector((state) => state.mangement);

  const [formData, setFormData] = useState({
    firstname: "",
    midname: "",
    lastname: "",
    phone: "",
    email: "",
    fileNo: "",
    national_number: "",
    DOB: "",
    registrationnumber: "",
    faculty_name: "",
    nationality: "",
    city: "",
    studentID: "",
  });

  const [editStates, setEditStates] = useState({
    firstname: false,
    midname: false,
    lastname: false,
    phone: false,
    email: false,
    fileNo: false,
    national_number: false,
    DOB: false,
    registrationnumber: false,
    faculty_name: false,
    nationality: false,
    city: false,
    studentID: false,
  });

  useEffect(() => {
    if (id) {
      if (typeof id === "string") {
        dispatch(getStudentId(parseInt(id)));
        dispatch(getFaculties());
      }
    }
    dispatch(getCities());
  }, [dispatch, id]);

  useEffect(() => {
    if (StudentId) {
      setFormData((prev) => ({
        ...prev,
        firstname: StudentId.firstname,
        midname: StudentId.midname,
        lastname: StudentId.lastname,
        phone: StudentId.phone,
        email: StudentId.email,
        fileNo: StudentId.fileNo.toString(),
        national_number: StudentId.national_number.toString(),
        DOB: StudentId.DOB,
        faculty_name: StudentId.facultyID.toString(),
        nationality: StudentId.nationality,
        nationalityID: StudentId.nationalityID.toString(),
        city: StudentId.city_id.toString(),
        studentID: StudentId.studentID.toString(),
      }));
    }
  }, [StudentId]);

  const toggleEditable = (field: keyof typeof formData) => {
    setEditStates((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const filteredFormData = Object.entries(formData).filter(
      ([key]) => key !== "registrationnumber"
    );
    const isFormValid = filteredFormData.every(([value]) =>
      typeof value === "string" ? value.trim() !== "" : value !== ""
    );

    if (!isFormValid) {
      toast.error("يرجى تعبئة جميع الحقول قبل الإرسال.");
      return;
    }

    if (
      !validateArabicOnly(formData.firstname) &&
      !validateArabicOnly(formData.midname) &&
      !validateArabicOnly(formData.lastname)
    ) {
      toast.error(
        "الرجاء التاكد من ان الاسم يتكون من كلمتين فقط و باللغة العربية"
      );
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error("الرجاء التاكد من البريد الالكتروني");
      return;
    }
    if (!validateLibyanPhoneNumber(formData.phone)) {
      toast.error("يجب التاكد من رقم الهاتف");
      return;
    }
    if (
      validateNationalID(
        formData.national_number,
        formData.national_number[0],
        formData.DOB
      )
    ) {
      toast.error("برجى التاكد من صحة الرقم الوطني");
      return;
    }

    setIsOpen(true);
  };

  const handleSubmitForm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        editStudent({
          ...formData,
          studentID: Number(formData.studentID),
          fileNo: Number(formData.fileNo),
          nationality: String(formData.nationality),
          nationalityID: 0,
        })
      ).unwrap();
      await dispatch(getStudentId(Number(formData.fileNo)));
    } catch {
    } finally {
      setIsOpen(false);
    }
  };

  if (isLoading) return <LoadingIcon />;
  if (error) return <div>لا توجد بيانات لعرضها</div>;
  return (
    <div className="pt-8 px-12">
      {status === "loading" && <DailogLoading />}
      <h1 className="text-3xl font-bold">بيانات الطالب:</h1>
      <form className="flex justify-between mt-8">
        <div>
          <div className="flex items-center mt-7">
            <label className="w-64 text-lg font-bold">الاسم الاول:</label>
            <Input
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              disabled={!editStates.firstname}
              className={`w-full h-10 ${
                !editStates.firstname ? "border-secondary" : "bg-yellow-50"
              }`}
            />
            <Button
              type="button"
              onClick={() => toggleEditable("firstname")}
              className="mr-2 px-4 py-2 bg-white hover:bg-secondary-50 text-secondary rounded-md flex items-center justify-center"
            >
              {editStates.firstname ? <FaSave /> : <FaEdit />}
            </Button>
          </div>
          <div className="flex items-center mt-7">
            <label className="w-64 text-lg font-bold">الاسم الثاني:</label>
            <Input
              name="midname"
              value={formData.midname}
              onChange={handleChange}
              disabled={!editStates.midname}
              className={`w-full h-10 ${
                !editStates.midname ? "border-secondary" : "bg-yellow-50"
              }`}
            />
            <Button
              type="button"
              onClick={() => toggleEditable("midname")}
              className="mr-2 px-4 py-2 bg-white hover:bg-secondary-50 text-secondary rounded-md flex items-center justify-center"
            >
              {editStates.midname ? <FaSave /> : <FaEdit />}
            </Button>
          </div>
          <div className="flex items-center mt-7">
            <label className="w-64 text-lg font-bold">اللقب:</label>
            <Input
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              disabled={!editStates.lastname}
              className={`w-full h-10 ${
                !editStates.lastname ? "border-secondary" : "bg-yellow-50"
              }`}
            />
            <Button
              type="button"
              onClick={() => toggleEditable("lastname")}
              className="mr-2 px-4 py-2 bg-white hover:bg-secondary-50 text-secondary rounded-md flex items-center justify-center"
            >
              {editStates.lastname ? <FaSave /> : <FaEdit />}
            </Button>
          </div>
          <div className="flex items-center mt-7">
            <label className="w-64 text-lg font-bold">رقم الملف:</label>
            <Input
              name="fileNo"
              value={formData.fileNo}
              onChange={handleChange}
              disabled={!editStates.fileNo}
              className={`w-full h-10 ${
                !editStates.fileNo ? "border-secondary" : "bg-yellow-50"
              }`}
            />
            <Button
              type="button"
              onClick={() => toggleEditable("fileNo")}
              className="mr-2 px-4 py-2 bg-white hover:bg-secondary-50 text-secondary rounded-md flex items-center justify-center"
            >
              {editStates.fileNo ? <FaSave /> : <FaEdit />}
            </Button>
          </div>
          <div className="flex items-center mt-7">
            <label className="w-64 text-lg font-bold">الرقم الوطني:</label>
            <Input
              name="national_number"
              value={formData.national_number}
              onChange={handleChange}
              disabled={!editStates.national_number}
              className={`w-full h-10 ${
                !editStates.national_number
                  ? "border-secondary"
                  : "bg-yellow-50"
              }`}
            />
            <Button
              type="button"
              onClick={() => toggleEditable("national_number")}
              className="mr-2 px-4 py-2 bg-white hover:bg-secondary-50 text-secondary rounded-md flex items-center justify-center"
            >
              {editStates.national_number ? <FaSave /> : <FaEdit />}
            </Button>
          </div>
          <div className="flex items-center mt-7">
            <label className="w-64 text-lg font-bold">رقم الهاتف:</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editStates.phone}
              type="tel"
              dir="rtl"
              className={`w-full h-10 ${
                !editStates.phone ? "border-secondary" : "bg-yellow-50"
              }`}
            />
            <Button
              type="button"
              onClick={() => toggleEditable("phone")}
              className="mr-2 px-4 py-2 bg-white hover:bg-secondary-50 text-secondary rounded-md flex items-center justify-center"
            >
              {editStates.phone ? <FaSave /> : <FaEdit />}
            </Button>
          </div>
        </div>
        <div>
          <div className="flex items-center mt-7">
            <label className="w-64 text-lg font-bold">رقم القيد :</label>
            <Input
              name="studentID"
              value={formData.studentID}
              onChange={handleChange}
              disabled={!editStates.studentID}
              className={`w-full h-10 ${
                !editStates.studentID ? "border-secondary" : "bg-yellow-50"
              }`}
            />
            <Button
              type="button"
              onClick={() => toggleEditable("studentID")}
              className="mr-2 px-4 py-2 bg-white hover:bg-secondary-50 text-secondary rounded-md flex items-center justify-center"
            >
              {editStates.studentID ? <FaSave /> : <FaEdit />}
            </Button>
          </div>
          <div className="flex items-center mt-7">
            <label className="w-64 text-lg font-bold">تاريخ الميلاد:</label>
            <Input
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              disabled={!editStates.DOB}
              className={`w-full h-10 ${
                !editStates.DOB ? "border-secondary" : "bg-yellow-50"
              }`}
            />
            <Button
              type="button"
              onClick={() => toggleEditable("DOB")}
              className="mr-2 px-4 py-2 bg-white hover:bg-secondary-50 text-secondary rounded-md flex items-center justify-center"
            >
              {editStates.DOB ? <FaSave /> : <FaEdit />}
            </Button>
          </div>
          <div className="flex items-center mt-7">
            <label className="w-64 text-lg font-bold">البريد الإلكتروني:</label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editStates.email}
              type="email"
              className={`w-full h-10 ${
                !editStates.email ? "border-secondary" : "bg-yellow-50"
              }`}
            />
            <Button
              type="button"
              onClick={() => toggleEditable("email")}
              className="mr-2 px-4 py-2 bg-white hover:bg-secondary-50 text-secondary rounded-md flex items-center justify-center"
            >
              {editStates.email ? <FaSave /> : <FaEdit />}
            </Button>
          </div>
          <div className="flex items-center mt-7">
            <label className="w-40 text-lg font-bold">الكلية :</label>
            <SelectValueComponents
              title="الكلية"
              data={faculties}
              ClassName="w-full"
              value={formData.faculty_name}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  faculty_name: value,
                }));
              }}
            />
          </div>
          <div className="flex items-center mt-7">
            <label className="w-40 text-lg font-bold">الجنسية :</label>
            <SelectValueComponents
              title="الجنسية"
              data={nationalityID}
              ClassName="w-full"
              value={
                formData.nationality === "Foreign" ||
                formData.nationality === "1"
                  ? "1"
                  : "0"
              }
              onValueChange={(value: string) => {
                setFormData((prev) => ({
                  ...prev,
                  nationality: value,
                }));
              }}
            />
          </div>
          <div className="flex items-center mt-7">
            <label className="w-40 text-lg font-bold">المدينة :</label>
            <SelectValueComponents
              title="المدينة"
              data={cities.map((city) => ({
                label: city.label,
                value: city.value.toString(),
              }))}
              value={formData.city}
              ClassName="w-full"
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  city: value,
                }));
              }}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-center mt-12">
        <Button
          type="button"
          className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary-600 w-56 h-10"
          onClick={validateInputs}
        >
          قبول التغييرات
        </Button>
      </div>

      <GeneralDailog
        clasName="mt-4"
        dialogTitle="هل أنت متأكد أنك تريد إضافة هذا المبنى؟"
        description={`قد لا تتمكن من التراجع بعد إتمامها`}
        onConfirm={handleSubmitForm}
        onOpenChange={(e) => setIsOpen(e)}
        isOpen={isOpen}
      />
    </div>
  );
}

export default EditStudent;
