import { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  showBuilding,
  getSupervisors,
  getRooms,
  getRoomsById,
} from "@/lib/fetsures/management/action";
import { Building, NewRoomList, RoomByIdResponse } from "mangement";
import GeneralTable from "@/components/ui/GeneralTable";
import { columnsStudentsRooms } from "@/lib/jsons/mangement/BuildingRoomtabs";

function RoomManagementTab() {
  const { buildings, rooms, roomSelected } = useAppSelector(
    (state) => state.mangement
  );
  const dispacth = useAppDispatch();
  useEffect(() => {
    const handleFetch = async () => {
      await dispacth(showBuilding());
      await dispacth(getSupervisors());
      await dispacth(getRooms());
    };
    handleFetch();
  }, [dispacth]);
  const [formData, setFormData] = useState({
    Roomnumber: "",
    Roomcapacity: "",
    population: "",
  });

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const [selectedRoom, setSelectedRoom] = useState<NewRoomList | null>(null);
  const [roomData, setRoomData] = useState<NewRoomList[]>([
    ...rooms.roomSelectList,
  ]);

  const handleBuildingChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const buildingId = parseInt(e.target.value);
    if (buildingId) {
      const build =
        buildings.buildingList.find((b) => b.id === buildingId) || null;
      setSelectedBuilding(build);
      if (build) {
        await dispacth(getRooms()).then((res) => {
          const roomsRes = res.payload as NewRoomList[];
          const roomData = roomsRes.filter((room) => room.value === build.id);
          setRoomData(roomData);
        });
      }
    }
  };

  const handleRoomChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const roomId = parseInt(e.target.value);
    if (roomId) {
      const room = rooms.roomSelectList.find((r) => r.value === roomId) || null;
      setSelectedRoom(room);
      if (room) {
        dispacth(getRoomsById(roomId)).then((res) => {
          if (res.meta.requestStatus === "rejected") return;
          const { room } = res.payload as RoomByIdResponse;
         
          setFormData({
            Roomnumber: room[0].RoomNo,
            Roomcapacity: room[0].MaxResidents.toString(),
            population: room[0].students.length.toString(),
          });
        });
      } else {
        setFormData({ Roomnumber: "", Roomcapacity: "", population: "" });
      }
    }
  };
  return (
    <div className="p-7 text-right gap-10">
      <div className="flex gap-16 mb-6">
        <div className="flex items-center w-1/3">
          <label className="ml-4 font-bold">اختر المبنى</label>
          <select
            onChange={handleBuildingChange}
            value={selectedBuilding?.id || ""}
            className="border p-2 rounded-md w-52"
          >
            <option value="">المبانى</option>
            {buildings.buildingList.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name_building}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center w-1/3">
          <label className="ml-4 font-bold">اختر الغرفة</label>
          <select
            onChange={handleRoomChange}
            value={selectedRoom?.value || ""}
            disabled={!selectedBuilding}
            className={`border p-2 rounded-md w-52 ${
              !selectedBuilding ? "bg-gray-200" : ""
            }`}
          >
            <option value="">
              {false ? "الغرف" : "يرجى اختيار المبنى أولاً"}
            </option>
            {roomData.map((room) => (
              <option key={room.value} value={room.value}>
                {room.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex">
        <div className="w-4/12">
          <h3 className="text-lg font-bold mb-6">بيانات الغرفة:</h3>
          {[
            { label: "رقم الغرفة", name: "Roomnumber" },
            { label: "السعة", name: "Roomcapacity" },
            { label: "عدد السكان", name: "population" },
          ].map((field) => (
            <div key={field.name} className="flex items-center mt-4">
              <label className="text-right w-48 text-lg font-bold">
                {field.label}:
              </label>
              <Input
                type="text"
                name={field.name}
                value={formData[field.name as keyof typeof formData] || ""}
                disabled
                className={`w-40 h-9 bg-gray-200 ml-4 border-0`}
              />

              {/* {field.name === "Roomnumber" && (
                <Button
                  type="button"
                  onClick={toggleEditable}
                  className="ml-4 px-4 py-2 bg-white hover:bg-gray-200 text-black rounded-md"
                ></Button>
              )} */}
            </div>
          ))}
        </div>

        <div className="border-l-3 border-muted h-auto mx-6"></div>

        <div className="w-1/2 max-h-56 overflow-auto">
          <h3 className="text-lg font-bold mb-6">بيانات السكان بالغرفة:</h3>

          <GeneralTable
            data={
              roomSelected?.room[0]?.students?.length
                ? roomSelected.room[0].students
                : []
            }
            columns={columnsStudentsRooms}
          />
        </div>
      </div>
    </div>
  );
}

export default RoomManagementTab;
