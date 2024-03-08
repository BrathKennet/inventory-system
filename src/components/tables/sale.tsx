import { getAllSaleByRangeServer } from "@/services/sale/server";
import ShowAlert from "../alert/show";
import { Hidden, TypeDeleteForm } from "@/models/enum_models";
import LinkIcon from "../buttons/link-icon";
import ShowSale from "../show/sale";
import DeleteAlert from "../alert/delete";

export default async function SaleTable({
  query,
  currentPage,
  rows,
}: {
  query: string;
  currentPage: number;
  rows: number;
}) {
  const sales = await getAllSaleByRangeServer(currentPage, query, rows);

  return (
    <div className="mb-2 mt-4 overflow-x-auto">
      <table className="border-collapse bg-background_s rounded-sm w-full ">
        <caption className="caption-bottom mt-3 text-primary">
          {sales?.length == 0 && "No results"}
        </caption>
        <thead className="text-primary bg-secondary text-base">
          <tr>
            <th className="border border-primary/40 w-[25%] p-1">Client</th>
            <th className="border border-primary/40 w-[20%] max-sm:hidden">
              Quantity Sold
            </th>
            <th className="border border-primary/40 w-[15%] max-lg:hidden">
              Total Sold
            </th>
            <th className="border border-primary/40 max-lg:hidden">
              Sale Date
            </th>
            <th className="border border-primary/40 w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-300 text-base">
          {sales?.map((v, i) => (
            <tr key={i}>
              <td className="border border-primary/40 p-1.5">
                {v.name_client}
              </td>
              <td className="border border-primary/40 p-1.5 max-sm:hidden">
                {v.quantity_sold}
              </td>
              <td className="border border-primary/40 p-1.5 max-lg:hidden">
                {v.total_sold}
              </td>
              <td className="border border-primary/40 p-1.5 max-lg:hidden">
                {v.sale_date}
              </td>
              <td className="border border-primary/40 p-1.5 ">
                <div className="flex flex-wrap justify-center gap-x-3 w-fit mx-auto">
                  <ShowAlert>
                    <ShowSale sale={v} />
                  </ShowAlert>
                  <LinkIcon
                    href={`/sales/edit?id=${v.id}`}
                    src="/svg/edit.svg"
                    alt="edit"
                    title="edit"
                  />
                  <DeleteAlert
                    id={v.id}
                    name={`Sale to ${v.name_client} / ${v.sale_date}`}
                    type={TypeDeleteForm.SALE}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
