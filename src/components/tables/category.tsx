import { getAllCategoryByRangeServer } from "@/services/category/server";
import EditCategoryAlert from "../alert/edit-category";
import DeleteAlert from "../alert/delete";
import { Hidden, TypeDeleteForm } from "@/models/enum_models";
import LinkIcon from "../buttons/link-icon";
import ShowAlert from "../alert/show";
import ShowCategory from "../show/category";

export default async function CategoryTable({
  query,
  currentPage,
  rows,
}: {
  query: string;
  currentPage: number;
  rows: number;
}) {
  const categories = await getAllCategoryByRangeServer(
    currentPage,
    query,
    rows
  );

  return (
    <div className="mb-2 mt-4 overflow-x-auto">
      <table className="border-collapse  bg-background_s rounded-sm w-full ">
        <caption className="caption-bottom mt-3 text-primary">
          {categories?.length == 0 && "No results"}
        </caption>
        <thead className="text-primary bg-secondary text-base">
          <tr>
            <th className="border border-primary/40 w-[50%] p-1">Category</th>
            <th className="border border-primary/40 max-md:hidden">
              Total Products
            </th>
            <th className="border border-primary/40 w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-300 text-base">
          {categories?.map((v) => (
            <tr key={v.name}>
              <td className="border border-primary/40 p-1.5">{v.name}</td>
              <td className="border border-primary/40 p-1.5 max-md:hidden">
                {v.product_count}
              </td>
              <td className="border border-primary/40 p-1.5 ">
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 w-fit mx-auto">
                  <ShowAlert hidden={Hidden.MD}>
                    <ShowCategory category={v} />
                  </ShowAlert>
                  <LinkIcon
                    href={`/products/add?idCategory=${v.id}`}
                    src="/svg/add.svg"
                    alt="add"
                    title="add product"
                  />
                  <EditCategoryAlert category={v} />
                  <DeleteAlert
                    id={v.id}
                    name={v.name}
                    type={TypeDeleteForm.CATEGORY}
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
