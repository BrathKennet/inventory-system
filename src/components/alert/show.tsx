"use client";

import { Hidden } from "@/models/enum_models";
import clsx from "clsx";
import { useState } from "react";

export default function ShowAlert({
  hidden,
  children,
}: {
  hidden?: Hidden;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className={clsx("hover:brightness-125 duration-500", {
          "sm:hidden": hidden == Hidden.SM,
          "md:hidden": hidden == Hidden.MD,
          "lg:hidden": hidden == Hidden.LG,
        })}
        onClick={() => setOpen(true)}
      >
        <img
          src="/svg/show.svg"
          alt="show"
          className="w-6 h-6"
          title="show details"
        />
      </button>
      {open && (
        <div className="bg-black/15 h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-background_s rounded-xl border border-secondary max-w-96 h-fit text-center p-3 max-h-screen overflow-y-scroll">
            <button
              className="hover:brightness-125 duration-500"
              onClick={() => setOpen(false)}
            >
              <img
                src="/svg/menu-close.svg"
                alt="close"
                className="w-10 h-10"
              />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
