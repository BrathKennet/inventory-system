import LinkButton from "@/components/buttons/link";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import SelectRows from "@/components/select/select-rows";
import SupplierTable from "@/components/tables/supplier";
import Title from "@/components/title";
import { getCountSupplierServer } from "@/services/supplier/server";
import Link from "next/link";
import { Suspense } from "react";

export default async function Suppliers({
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
  const totalPages = await getCountSupplierServer(query, rows);

  return (
    <>
      <Title text="Suppliers" />
      <div className="my-10">
        <LinkButton href="/suppliers/add" text="Add Supplier" />
      </div>
      <div className="flex flex-wrap justify-between">
        <Search placeholder="Search Supplier" />
        <SelectRows rows={rows} />
      </div>
      <Suspense fallback={<p>Loading</p>}>
        <SupplierTable query={query} currentPage={currentPage} rows={rows} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
