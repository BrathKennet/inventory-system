import DeleteAlert from "../alert/delete";
import { Hidden, TypeDeleteForm } from "@/models/enum_models";
import LinkIcon from "../buttons/link-icon";
import ShowAlert from "../alert/show";
import ShowPerson from "../show/person";
import { getAllClientByRangeServer } from "@/services/client/server";

export default async function ClientTable({
  query,
  currentPage,
  rows,
}: {
  query: string;
  currentPage: number;
  rows: number;
}) {
  const clients = await getAllClientByRangeServer(currentPage, query, rows);

  return (
    <div className="mb-2 mt-4 overflow-x-auto">
      <table className="border-collapse bg-background_s rounded-sm w-full ">
        <caption className="caption-bottom mt-3 text-primary">
          {clients?.length == 0 && "No results"}
        </caption>
        <thead className="text-primary bg-secondary text-base">
          <tr>
            <th className="border border-primary/40 w-[25%] p-1">Name</th>
            <th className="border border-primary/40 w-[20%] max-sm:hidden">
              Address
            </th>
            <th className="border border-primary/40 w-[15%] max-lg:hidden">
              Phone
            </th>
            <th className="border border-primary/40 max-lg:hidden">Email</th>
            <th className="border border-primary/40 w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-300 text-base">
          {clients?.map((v) => (
            <tr key={v.name}>
              <td className="border border-primary/40 p-1.5">{v.name}</td>
              <td className="border border-primary/40 p-1.5 max-sm:hidden">
                {v.address}
              </td>
              <td className="border border-primary/40 p-1.5 max-lg:hidden">
                {v.phone}
              </td>
              <td className="border border-primary/40 p-1.5 max-lg:hidden">
                {v.email}
              </td>
              <td className="border border-primary/40 p-1.5 ">
                <div className="flex flex-wrap justify-center gap-x-3 w-fit mx-auto">
                  <ShowAlert hidden={Hidden.LG}>
                    <ShowPerson person={v} />
                  </ShowAlert>
                  <LinkIcon
                    href={`/sales/add?idClient=${v.id}`}
                    src="/svg/add.svg"
                    alt="add"
                    title="add sale"
                  />
                  <LinkIcon
                    href={`/clients/edit?id=${v.id}`}
                    src="/svg/edit.svg"
                    alt="edit"
                    title="edit"
                  />
                  <DeleteAlert
                    id={v.id}
                    name={v.name}
                    type={TypeDeleteForm.CLIENT}
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
