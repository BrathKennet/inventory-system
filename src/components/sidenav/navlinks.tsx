"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Suppliers", href: "/suppliers" },
  { name: "Sales", href: "/sales" },
  { name: "Purchases", href: "/purchases" },
  { name: "Clients", href: "/clients" },
  { name: "Lots", href: "/lots" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div>
      {links.map((link) => (
        <Link href={link.href} key={link.name}>
          <div
            className={`my-3 py-4 block pl-5 rounded-s-lg hover:bg-secondary pr-8 ${
              pathname == link.href ? "bg-secondary" : ""
            }`}
          >
            <p className="text-lg">{link.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
