import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CityCardProps {
  city: string;
  value: number;
  progress: number; 
  label: string;
}

export const CityCard: React.FC<CityCardProps> = ({
  city,
  value,
  progress,
  label,
}) => {
  return (
    <Card className="w-1/2 px-4 border border-primary-500 bg-[#FAF7F2] rounded-lg">
      <CardHeader className="py-2">
        <CardTitle className="py-3 text-2xl font-bold border-b-2 border-primary-500">
          {city}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center gap-1">
        <div className="text-4xl font-bold text-secondary">{value}</div>
        <Progress
          value={progress}
          className="w-full h-2 my-2 bg-gray-200 rounded-full"
        />
        <span className="text-sm font-bold text-secondary">{label}</span>
      </CardContent>
    </Card>
  );
};
