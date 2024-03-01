"use client";

import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const WAIT_BETWEEN_CHANCE = 300;

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    push(`${pathname}?${params.toString()}`);
  }, WAIT_BETWEEN_CHANCE);

  return (
    <div className="flex max-w-96">
      <div className="my-1 w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <img src="/svg/search.svg" alt="search" className="w-5 h-5" />
          </div>
          <input
            type="search"
            id="search"
            className="block pl-10 placeholder-slate-500 h-10 w-full border-b-2 border-primary text-gray-300 focus:outline-none focus:borer-rose-600 bg-transparent text-base"
            placeholder={placeholder}
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get("query")?.toString()}
          />
        </div>
      </div>
    </div>
  );
}
