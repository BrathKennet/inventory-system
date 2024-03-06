import LinkButton from "@/components/buttons/link";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import SelectRows from "@/components/select/select-rows";
import LotTable from "@/components/tables/lot";
import Title from "@/components/title";
import { getCountLotServer } from "@/services/lot/server";
import { Suspense } from "react";

export default async function Lots({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    rows?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const rows = Number(searchParams?.rows) || 10;
  const totalPages = await getCountLotServer(query, rows);

  return (
    <>
      <Title text="Lots" />
      <div className="my-10">
        <LinkButton href="/lots/add" text="Add Lot" />
      </div>
      <div className="flex flex-wrap justify-between">
        <Search placeholder="Search Product or Supplier" />
        <SelectRows rows={rows} />
      </div>
      <Suspense fallback={<p>Loading</p>}>
        <LotTable query={query} currentPage={currentPage} rows={rows} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
