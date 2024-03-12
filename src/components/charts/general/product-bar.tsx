"use client";

import TemplateBarChart from "../template/bar-chart";
import SelectGeneral from "@/components/select/select-general";
import { useState } from "react";

export default function ProductBar({
  categories,
  products,
}: {
  categories: any[] | null;
  products: any[] | null;
}) {
  const initialCategory = categories ? categories[0].id : "";
  const initialProducts = products?.filter(
    (v) => initialCategory == v.id_category
  );

  const [productsSelect, setProductsSelect] = useState(initialProducts);

  const handleChange = (e: { target: { value: any } }) => {
    const newProducts = products?.filter(
      (v) => e.target.value == v.id_category
    );
    setProductsSelect(newProducts);
  };

  return (
    <div className="w-full">
      <div className="max-w-[350px] mb-6">
        <SelectGeneral
          id=""
          name=""
          label="Select a category"
          options={categories}
          handleChange={handleChange}
          defaultValue={initialCategory}
        />
      </div>
      <TemplateBarChart
        id="Products"
        categories={productsSelect?.map((v) => v.name)}
        dataSeries={
          productsSelect ? productsSelect?.map((v) => v.total_stock) : []
        }
      />
    </div>
  );
}
