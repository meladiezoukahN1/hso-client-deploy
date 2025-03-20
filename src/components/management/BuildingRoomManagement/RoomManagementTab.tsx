import { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  getRoomsById,
  editRoom,
  getBuildings,
  SelectBuilding,
  getBuildingById,
} from "@/lib/fetsures/management/action";
import GeneralTable from "@/components/ui/GeneralTable";
import { columnsStudentsRooms } from "@/lib/jsons/mangement/BuildingRoomtabs";
import BuildingSelector from "./ui/BuildingSelector";
import RoomSelector from "./ui/RoomSelector";
import { DailogLoading } from "@/components/ui";
import { toast } from "sonner";

function RoomManagementTab() {
  const { isLoading, roomSelected, selectBuilding, getRoomsSelect } =
    useAppSelector((state) => state.mangement);
  const dispacth = useAppDispatch();

  useEffect(() => {
    (async function fetchData() {
      await dispacth(getBuildings());
      await dispacth(SelectBuilding());
    })();
  }, [dispacth]);

  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(
    null
  );
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  // تحديث الحالة لتشمل RoomNo, FloorNo و MaxResidents
  const [formData, setFormData] = useState({
    RoomNo: "",
    FloorNo: "",
    MaxResidents: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (roomSelected) {
      setFormData({
        RoomNo: roomSelected.RoomNo,
        FloorNo: roomSelected.FloorNo.toString(),
        MaxResidents: roomSelected.MaxResidents.toString(),
      });
      setIsEditing(true);
    } else {
      setFormData({
        RoomNo: "",
        FloorNo: "",
        MaxResidents: "",
      });
      setIsEditing(false);
    }
  }, [roomSelected]);

  const handleBuildingChange = async (buildingId: number) => {
    if (buildingId) {
      await dispacth(getBuildingById(buildingId)).unwrap();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRoomChange = async (roomId: number) => {
    if (roomId) {
      await dispacth(getRoomsById(roomId)).unwrap();
    }
  };

  const handleSubmit = async () => {
    if (!roomSelected?.Room_id) return;

    const editData = {
      id: roomSelected.Room_id,
      RoomNo: formData.RoomNo,
      FloorNo: Number(formData.FloorNo),
      MaxResidents: Number(formData.MaxResidents),
    };

    try {
      await dispacth(editRoom(editData)).unwrap();
      // إعادة تعيين كل الحقول
      setFormData({
        RoomNo: "",
        FloorNo: "",
        MaxResidents: "",
      });
      setSelectedBuildingId(null);
      setSelectedRoomId(null);
      setIsEditing(false);
      // إعادة تحميل البيانات إذا لزم
      await dispacth(getBuildings());
      await dispacth(SelectBuilding());
    } catch (error) {
      console.error("Failed to edit room:", error);
    }
  };

  return (
    <div className="mt-[2%] text-right">
      <div className="flex flex-col md:flex-row mb-[2%]">
        <div>
          <BuildingSelector
            buildings={selectBuilding}
            onSelect={(id) => {
              setSelectedBuildingId(id);
              handleBuildingChange(id);
              setSelectedRoomId(null); // إعادة تعيين الغرفة عند تغيير المبنى
            }}
            value={selectedBuildingId ? String(selectedBuildingId) : "default"}
          />
        </div>
        <div className="md:mr-[7%]">
          <RoomSelector
            rooms={getRoomsSelect}
            onSelect={(id) => {
              setSelectedRoomId(id);
              handleRoomChange(id);
            }}
            value={selectedRoomId ? String(selectedRoomId) : "default"}
            disabled={!selectedBuildingId}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-bold border-b pb-2">بيانات الغرفة</h2>
          <div className="space-y-3">
            {[
              { label: "رقم الغرفة", name: "RoomNo", editable: true },
              { label: "رقم الطابق", name: "FloorNo", editable: true },
              { label: "سعة الغرفة", name: "MaxResidents", editable: true },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-gray text-lg">{item.label}</span>
                <Input
                  name={item.name}
                  value={formData[item.name as keyof typeof formData] || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing || !item.editable}
                  className={`w-4/6 ${
                    item.editable ? "bg-white" : "bg-gray-100"
                  } border`}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  حفظ التعديلات
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      RoomNo: "",
                      FloorNo: "",
                      MaxResidents: "",
                    });
                    setSelectedBuildingId(null);
                    setSelectedRoomId(null);
                  }}
                  className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
                >
                  إلغاء
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const isValid =
                    selectBuilding &&
                    formData.FloorNo &&
                    formData.MaxResidents &&
                    formData.RoomNo;
                  if (isValid) {
                    setIsEditing(true);
                  } else {
                    toast.error("يرجى تعبئة جميع الحقول");
                  }
                }}
                className="w-full bg-primary-700 text-white py-2 rounded-md hover:bg-primary-600"
              >
                تعديل الغرفة
              </button>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold border-b pb-2 mb-4">
            بيانات سكان الغرفة
          </h2>
          <div className="overflow-x-auto">
            <GeneralTable
              data={roomSelected?.students || []}
              columns={columnsStudentsRooms}
            />
          </div>
        </div>
      </div>
      {isLoading && <DailogLoading />}
    </div>
  );
}

export default RoomManagementTab;
