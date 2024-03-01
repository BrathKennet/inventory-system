"use client";

import { generatePagination } from "@/utils/pagination";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function PaginationElement({
  content,
  active,
  disable,
  href,
}: {
  content: string;
  active?: boolean;
  disable?: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        " min-w-7 h-7 rounded-lg text-center text-lg px-1 hover:bg-primary hover:text-secondary",
        { "bg-secondary text-primary": !active },
        { "bg-primary text-secondary pointer-events-none": active },
        { "pointer-events-none": disable }
      )}
    >
      {content}
    </Link>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex gap-x-1">
      {totalPages > 1 && (
        <PaginationElement
          content="<"
          disable={currentPage == 1}
          href={createPageURL(currentPage - 1)}
        />
      )}
      {allPages.map((v, i) => (
        <PaginationElement
          content={v.toString()}
          key={i}
          active={currentPage.toString() == v.toString()}
          disable={v.toString() == "..."}
          href={createPageURL(v)}
        />
      ))}
      {totalPages > 1 && (
        <PaginationElement
          content=">"
          disable={currentPage == totalPages}
          href={createPageURL(currentPage + 1)}
        />
      )}
    </div>
  );
}
