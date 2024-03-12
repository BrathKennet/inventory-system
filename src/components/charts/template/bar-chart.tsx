"use client"; // if you use app dir, don't forget this line

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TemplateBarChart({
  id,
  categories,
  dataSeries,
}: {
  id: string;
  categories: any[] | undefined;
  dataSeries: any[];
}) {
  const options: ApexOptions = {
    chart: { id },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#e5e7eb",
        },
      },
    },
    yaxis: {
      title: {
        text: "Qty",
        style: {
          color: "#e5e7eb",
        },
      },
      labels: {
        style: {
          colors: "#e5e7eb",
        },
      },
    },
  };

  const series: ApexOptions["series"] = [
    {
      name: "Qty",
      data: dataSeries,
    },
  ];

  return (
    <ApexChart
      type="bar"
      options={options}
      series={series}
      height={300}
      width={"100%"}
    />
  );
}
