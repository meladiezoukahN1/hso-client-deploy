import { FC } from "react";

interface City {
  name: string;
  value: number;
}

interface CityListCardProps {
  cities: City[];
}

export const CityListCard: FC<CityListCardProps> = ({ cities }) => {
  return (
    <div className="max-h-[70vh] overflow-auto rounded-lg p-8 border border-primary-500 bg-[#FAF7F2]">
      <h2 className="text-center text-2xl font-bold">المدن</h2>
      <ul className="mt-4">
        {cities.map((city, index) => (
          <li
            key={index}
            className={`flex justify-between py-4 font-bold ${
              cities.length - 1 === index ? "" : "border-b-2 border-secondary"
            }`}
          >
            <span>{city.name}</span>
            <span>{city.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
