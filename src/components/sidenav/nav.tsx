"use client";

import { useEffect, useState } from "react";
import Logout from "../forms/auth/logout";
import NavLinks from "./navlinks";
import { usePathname } from "next/navigation";

export default function Sidenav() {
  const [visible, setVisible] = useState(true);
  const [visibleM, setVisibleM] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setVisibleM(false);
  }, [pathname]);

  return (
    <div className={`h-full fixed md:relative z-30`}>
      <div className="fixed z-10 ">
        <button className="max-md:hidden" onClick={() => setVisible(!visible)}>
          <img
            className="w-10 h-10"
            src={`/svg/${visible ? "menu-close.svg" : "menu-open.svg"}`}
          />
        </button>
        <button className="md:hidden" onClick={() => setVisibleM(!visibleM)}>
          <img
            className="w-10 h-10"
            src={`/svg/${visibleM ? "menu-close.svg" : "menu-open.svg"}`}
          />
        </button>
      </div>
      <aside
        className={`h-full overflow-y-auto overflow-x-hidden bg-background_s  duration-500 py-5 w-fit grid content-between max-md:hidden ${
          visible ? "pl-12 -ml-0" : "-ml-60 pl-0"
        }`}
      >
        <NavLinks />
        <div className="w-[80%]">
          <Logout />
        </div>
      </aside>

      <aside
        className={`h-full overflow-y-auto overflow-x-hidden bg-background_s  duration-500 py-5 w-fit grid content-between md:hidden ${
          visibleM ? "pl-12 -ml-0" : "-ml-60 pl-0"
        }`}
      >
        <NavLinks />
        <div className="w-[80%]">
          <Logout />
        </div>
      </aside>
    </div>
  );
}
