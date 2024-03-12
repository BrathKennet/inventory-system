"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TemplatePieChart({
  id,
  labels,
  series,
}: {
  id: string;
  labels: any[] | undefined;
  series: any[] | undefined;
}) {
  const options: ApexOptions = {
    chart: { id },
    labels,
    legend: {
      labels: {
        colors: "#e5e7eb",
      },
    },
    fill: {
      opacity: 0.9,
    },
    stroke: {
      colors: ["#040A2F"],
      width: 2,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
            height: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 380,
        options: {
          chart: {
            width: 260,
            height: 260,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <ApexChart
      options={options}
      series={series}
      type="pie"
      height={420}
      width={"100%"}
    />
  );
}
