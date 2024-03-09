import Pagination from "@/components/pagination";
import Search from "@/components/search";
import SelectRows from "@/components/select/select-rows";
import TransactionTable from "@/components/tables/transaction";
import Title from "@/components/title";
import { getCountTransactionServer } from "@/services/transaction/server";
import { Suspense } from "react";

export default async function Transactions({
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
  const totalPages = await getCountTransactionServer(query, rows);

  return (
    <>
      <Title text="Transactions" />
      <div className="flex flex-wrap justify-between">
        <Search placeholder="Search Product" />
        <SelectRows rows={rows} />
      </div>
      <Suspense fallback={<p>Loading</p>}>
        <TransactionTable query={query} currentPage={currentPage} rows={rows} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
