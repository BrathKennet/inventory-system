import CategoryChart from "@/components/charts/general/category-chart";
import LotChart from "@/components/charts/general/lot-chart";
import ProductChart from "@/components/charts/general/product-chart";
import SaleChart from "@/components/charts/general/sale-chart";
import InfoContainer from "@/components/info-card/container";
import Title from "@/components/title";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Title text="Home" />
      <Suspense fallback={<p>Loading</p>}>
        <InfoContainer />
      </Suspense>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-5 gap-y-5 w-full mt-10 place-items-center">
        <Suspense fallback={<p>Loading</p>}>
          <CategoryChart />
        </Suspense>
        <Suspense fallback={<p>Loading</p>}>
          <ProductChart />
        </Suspense>
        <Suspense fallback={<p>Loading</p>}>
          <LotChart />
        </Suspense>
        <Suspense fallback={<p>Loading</p>}>
          <SaleChart />
        </Suspense>
      </div>
    </>
  );
}
