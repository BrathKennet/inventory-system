import LinkButton from "@/components/buttons/link";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import SelectRows from "@/components/select/select-rows";
import ClientTable from "@/components/tables/client";
import Title from "@/components/title";
import { getCountClientServer } from "@/services/client/server";
import { Suspense } from "react";

export default async function Clients({
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
  const totalPages = await getCountClientServer(query, rows);

  return (
    <>
      <Title text="Clients" />
      <div className="my-10">
        <LinkButton href="/clients/add" text="Add Client" />
      </div>
      <div className="flex flex-wrap justify-between">
        <Search placeholder="Search Client" />
        <SelectRows rows={rows} />
      </div>
      <Suspense fallback={<p>Loading</p>}>
        <ClientTable query={query} currentPage={currentPage} rows={rows} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
