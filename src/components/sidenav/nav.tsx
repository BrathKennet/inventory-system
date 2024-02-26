"use client";

import { useState } from "react";
import Logout from "../logout";
import NavLinks from "./navlinks";

export default function Sidenav() {
  const [visible, setVisible] = useState(window.innerWidth > 768);
  /* const [visible, setVisible] = useState(true); */

  return (
    <div className={`h-full fixed md:relative`}>
      <div className="fixed z-10">
        <button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <img
            className="w-10 h-10"
            src={`/svg/${visible ? "menu-close.svg" : "menu-open.svg"}`}
          />
        </button>
      </div>
      <aside
        className={`h-full overflow-y-auto overflow-x-hidden bg-background_s  duration-500 py-5 w-fit grid content-between ${
          visible ? "pl-12" : "-ml-60 pl-0 opacity-0"
        }`}
      >
        <NavLinks />
        <Logout />
      </aside>
    </div>
  );
}
