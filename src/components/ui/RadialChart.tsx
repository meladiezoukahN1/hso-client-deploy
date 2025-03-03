"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

interface ComponentChartProps {
  title: string;
  count: number;
  max: number;
  icon: React.ElementType;
  color: string;
}

export default function ComponentChart({
  title,
  count,
  max,
  icon: Icon,
  color,
}: ComponentChartProps) {
  const percentage = (count / max) * 100;

  const chartData = [{ name: title, visitors: percentage, fill: color }];
  // DB0000

  return (
    <Card className="flex flex-col border-0 rounded-xl p-4">
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={{ visitors: { label: title } }}
          className="mx-auto aspect-square max-h-36 p-0"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={60}
            outerRadius={90}
          >
            <PolarGrid
              gridType="circle"
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[65, 55]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={5} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy ? viewBox.cy + 5 : "20"}
                          className="fill-primray-600 text-4xl font-bold"
                        >
                          {count.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-sm mt-5 text-primray-600">
        <div className="flex items-center gap-2 font-medium leading-none">
          <Icon className="h-5 w-5 bg-primray-600 " />
          <span className="font-medium text-xl text-[#1A3D61]">{title}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
