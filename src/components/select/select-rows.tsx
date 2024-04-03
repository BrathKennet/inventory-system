"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const rowsPerPage = [5, 10, 25, 50, 100, 250, 500];

export default function SelectRows({ rows }: { rows: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const changeRows = (rows: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (rows !== "10") {
      params.set("rows", rows);
    } else {
      params.delete("rows");
    }
    push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="self-center">
      <label htmlFor="rows">Rows per page: </label>
      <select
        value={rows}
        onChange={(e) => changeRows(e.target.value)}
        className="bg-background_s text-base"
        id="rows"
      >
        {rowsPerPage.map((v) => (
          <option value={v} key={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}
