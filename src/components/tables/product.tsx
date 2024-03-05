import { getAllProductByRangeServer } from "@/services/product/server";
import LinkIcon from "../buttons/link-icon";
import DeleteAlert from "../alert/delete";
import { TypeDeleteForm } from "@/models/enum_models";
import ShowAlert from "../alert/show";
import ShowProduct from "../show/product";

export default async function ProductTable({
  query,
  currentPage,
  rows,
}: {
  query: string;
  currentPage: number;
  rows: number;
}) {
  const products = await getAllProductByRangeServer(currentPage, query, rows);

  return (
    <div className="mb-2 mt-4">
      <table className="border-collapse  bg-background_s rounded-sm w-full ">
        <caption className="caption-bottom mt-3 text-primary">
          {products?.length == 0 && "No results"}
        </caption>
        <thead className="text-primary bg-secondary text-base">
          <tr>
            <th className="border border-gray-500 w-[25%] p-1">Name</th>
            <th className="border border-gray-500 w-[20%] max-sm:hidden">
              Category
            </th>
            <th className="border border-gray-500 max-lg:hidden">
              Description
            </th>
            <th className="border border-gray-500 w-[10%]">Total Stock</th>
            <th className="border border-gray-500 w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-300 text-base">
          {products?.map((v) => (
            <tr key={v.name}>
              <td className="border border-gray-500 p-1.5">{v.name}</td>
              <td className="border border-gray-500 p-1.5 max-sm:hidden">
                {v.name_category}
              </td>
              <td className="border border-gray-500 p-1.5 max-lg:hidden">
                {v.description}
              </td>
              <td className="border border-gray-500 p-1.5 ">{v.total_stock}</td>
              <td className="border border-gray-500 p-1.5 ">
                <div className="flex flex-wrap justify-center gap-x-3 w-fit mx-auto">
                  <ShowAlert>
                    <ShowProduct product={v} />
                  </ShowAlert>
                  <LinkIcon
                    href={`/products/edit?id=${v.id}`}
                    src="/svg/edit.svg"
                    alt="edit"
                    title="edit"
                  />
                  <DeleteAlert
                    id={v.id}
                    name={v.name}
                    type={TypeDeleteForm.PRODUCT}
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
