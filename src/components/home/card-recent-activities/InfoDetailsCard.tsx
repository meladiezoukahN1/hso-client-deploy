"use client"

import {
  Card as CardContainer,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ReqLastNotification } from "home";

export default function InfoDetailsCard({
  title,
  details,
}: {
  title: string;
  details: ReqLastNotification[];
}) {
  return (
    <div>
      <CardContainer className="bg-[#EFEFEF] w-[423px]  border-none rounded-3xl">
        <CardTitle className="text-base font-bold mr-4">{title}:</CardTitle>
        <CardContent>
          <h1 className="text-xl font-bold mr-4"></h1>
          <ul className="text-base mt-3">
            {details?.length === 0 || !details ? (
              <li className="mb-1">لا توجد بيانات لعرضها</li>
            ) : (
              details.map((detail, index) => (
                <li key={index} className="mb-1 text-sm">
                  {detail.description.replace('created', "قبول")}
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </CardContainer>
    </div>
  );
}
