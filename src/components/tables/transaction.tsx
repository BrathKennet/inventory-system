import { getAllTransactionByRangeServer } from "@/services/transaction/server";
import DeleteAlert from "../alert/delete";
import { Hidden, TypeDeleteForm } from "@/models/enum_models";
import ShowAlert from "../alert/show";
import ShowTransaction from "../show/transaction";
import { getNameTransaction } from "@/utils/type-transaction";

export default async function TransactionTable({
  query,
  currentPage,
  rows,
}: {
  query: string;
  currentPage: number;
  rows: number;
}) {
  const transactions = await getAllTransactionByRangeServer(
    currentPage,
    query,
    rows
  );

  return (
    <div className="mb-2 mt-4 overflow-x-auto">
      <table className="border-collapse bg-background_s rounded-sm w-full ">
        <caption className="caption-bottom mt-3 text-primary">
          {transactions?.length == 0 && "No results"}
        </caption>
        <thead className="text-primary bg-secondary text-base">
          <tr>
            <th className="border border-primary/40 w-[25%] p-1">
              Product
            </th>
            <th className="border border-primary/40 w-[20%] max-sm:hidden">
              Quantity
            </th>
            <th className="border border-primary/40 w-[15%] max-lg:hidden">
              Transaction Date
            </th>
            <th className="border border-primary/40 max-lg:hidden">Type</th>
            <th className="border border-primary/40 w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-300 text-base">
          {transactions?.map((v, i) => (
            <tr key={i}>
              <td className="border border-primary/40 p-1.5">
                {v.name_product}
              </td>
              <td className="border border-primary/40 p-1.5 max-sm:hidden">
                {v.quantity}
              </td>
              <td className="border border-primary/40 p-1.5 max-lg:hidden">
                {v.transaction_date}
              </td>
              <td className="border border-primary/40 p-1.5 max-lg:hidden">
                {getNameTransaction(v.id_type)}
              </td>
              <td className="border border-primary/40 p-1.5 ">
                <div className="flex flex-wrap justify-center gap-x-3 w-fit mx-auto">
                  <ShowAlert hidden={Hidden.LG}>
                    <ShowTransaction transaction={v} />
                  </ShowAlert>
                  <DeleteAlert
                    id={v.id}
                    name={v.name}
                    type={TypeDeleteForm.TRANSACTION}
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
