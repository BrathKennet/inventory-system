"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Lots", href: "/lots" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Suppliers", href: "/suppliers" },
  { name: "Sales", href: "/sales" },
  { name: "Clients", href: "/clients" },
  { name: "Transactions", href: "/transactions" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div>
      {links.map((link) => (
        <Link href={link.href} key={link.name}>
          <div
            className={clsx(
              "my-3 py-4 block pl-5 rounded-s-lg hover:bg-secondary pr-8",
              { "bg-secondary": pathname == link.href }
            )}
          >
            <p className="text-lg">{link.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* 
className={`my-3 py-4 block pl-5 rounded-s-lg hover:bg-secondary pr-8 ${
              pathname == link.href ? "bg-secondary" : ""
            }`} */