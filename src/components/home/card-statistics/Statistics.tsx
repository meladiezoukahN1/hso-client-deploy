import {
  Card as CardContainer,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { CardProps } from "home";

export default function InfoCard({ title, count, icon: Icon }: CardProps) {
  return (
    <CardContainer className="flex flex-col items-center bg-[linear-gradient(180deg,#F5E8C7_5%,#DBB459_99%)] shadow-md rounded-lg w-64 h-48 text-lg font-medium">
      <CardTitle className="flex items-center mt-6">
        <span className="text-3xl ml-1">
          <Icon />
        </span>
        <span className="ml-2 font-bold text-black">{title}</span>
      </CardTitle>
      <CardDescription className="mt-4">
        <div className="text-7xl font-bold text-black">{count}</div>
      </CardDescription>
    </CardContainer>
  );
}
