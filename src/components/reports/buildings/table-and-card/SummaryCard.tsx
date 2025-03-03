import { BuildingData } from "reports";

export const SummaryCard = ({
  summary,
}: {
  summary: BuildingData["summary"];
}) => {
  return (
    <div className="rounded-lg px-8 py-4 border border-primary-500 bg-[#FAF7F2] mt-12 w-1/3">
      <h2 className="text-lg font-bold text-secondary">إجمالي</h2>
      <ul className="mt-4 text-right text-sm">
        <li className="my-5 flex justify-between items-center">
          <strong className="text-secondary">عدد الطلبة:</strong>
          <span className="font-bold text-secondary">
            {summary.num_of_students}
          </span>
        </li>
        <li className="my-5 flex justify-between items-center">
          <strong className="text-secondary">عدد الغرف الممتلئة:</strong>
          <span className="font-bold text-secondary">
            {summary.room_count_full}
          </span>
        </li>
        <li className="my-5 flex justify-between items-center">
          <strong className="text-secondary">عدد الغرف الشاغرة:</strong>
          <span className="font-bold text-secondary">
            {summary.room_count_not_full}
          </span>
        </li>
      </ul>
    </div>
  );
};
