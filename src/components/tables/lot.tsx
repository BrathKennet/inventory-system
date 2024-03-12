import { getAllLotByRangeServer } from "@/services/lot/server";
import ShowAlert from "../alert/show";
import LinkIcon from "../buttons/link-icon";
import DeleteAlert from "../alert/delete";
import { TypeDeleteForm } from "@/models/enum_models";
import ShowLot from "../show/lot";
import RemoveStockAlert from "../alert/remove-stock";
import clsx from "clsx";

export default async function LotTable({
  query,
  currentPage,
  rows,
}: {
  query: string;
  currentPage: number;
  rows: number;
}) {
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() - 1);

  const lots = await getAllLotByRangeServer(currentPage, query, rows);

  return (
    <div className="mb-2 mt-4 overflow-x-auto">
      <table className="border-collapse  bg-background_s rounded-sm w-full ">
        <caption className="caption-bottom mt-3 text-primary">
          {lots?.length == 0 && "No results"}
        </caption>
        <thead className="text-primary bg-secondary text-base">
          <tr>
            <th className="border border-primary/40 w-[10%] sm:w-[64px] p-1">
              Stock
            </th>
            <th className="border border-primary/40 w-[10%] sm:w-[64px] md:w-[10%] p-1">
              Sale Price Unit
            </th>
            <th className="border border-primary/40 w-[128px] max-sm:hidden">
              Purchase Date
            </th>
            <th className="border border-primary/40 w-[128px] ">
              Expiraton Date
            </th>
            <th className="border border-primary/40 ">Name Product</th>
            <th className="border border-primary/40 ">Name Supplier</th>
            <th className="border border-primary/40 w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-300 text-base">
          {lots?.map((v, i) => (
            <tr
              key={i}
              className={clsx({
                "bg-red-700/30": new Date(v.expiration_date) < dateNow,
              })}
            >
              <td className="border border-primary/40 p-1.5">{v.stock}</td>
              <td className="border border-primary/40 p-1.5">
                {v.sale_price_unit}
              </td>
              <td className="border border-primary/40 p-1.5 max-sm:hidden">
                {v.purchase_date}
              </td>
              <td
                className="border border-primary/40 p-1.5"
              >
                {v.expiration_date}
              </td>
              <td className="border border-primary/40 p-1.5 ">
                {v.name_product}
              </td>
              <td className="border border-primary/40 p-1.5">
                {v.name_supplier}
              </td>
              <td className="border border-primary/40 p-1.5 ">
                <div className="flex flex-wrap justify-center gap-x-3 w-fit mx-auto">
                  <ShowAlert>
                    <ShowLot lot={v} />
                  </ShowAlert>
                  <RemoveStockAlert lot={v} />
                  <LinkIcon
                    href={`/lots/edit?id=${v.id}`}
                    src="/svg/edit.svg"
                    alt="edit"
                    title="edit"
                  />
                  <DeleteAlert
                    id={v.id}
                    name={v.name_product}
                    type={TypeDeleteForm.LOT}
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
