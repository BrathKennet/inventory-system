"use client"; // if you use app dir, don't forget this line

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TemplateLineChart({
  id,
  titleYAxis,
  categories,
  dataSeries,
}: {
  id: string;
  titleYAxis: string;
  categories: any[] | undefined;
  dataSeries: any;
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
    stroke: {
      curve: "smooth",
    },
    yaxis: {
      title: {
        text: titleYAxis,
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

  const series: ApexOptions["series"] = dataSeries;

  return (
    <ApexChart
      type="line"
      options={options}
      series={series}
      height={350}
      width={"100%"}
    />
  );
}
