import {
  Card as CardContainer,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CardProps } from "mangement";

export default function Card({ title, url }: CardProps) {
  return (
    <Link href={url} className="w-full">
      <CardContainer className="flex flex-col justify-center items-center bg-[#F5E8C7] shadow-md rounded-lg h-44 text-base font-medium text-center">
        <CardTitle>
          <span className="font-bold text-foreground text-2xl">{title}</span>
        </CardTitle>
        <CardDescription className="mt-4"></CardDescription>
      </CardContainer>
    </Link>
  );
}
