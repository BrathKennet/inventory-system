"use client";

import { useState } from "react";

export default function ViewSupplierAlert({ supplier }: { supplier: any }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="hover:brightness-125 duration-500 md:hidden"
        onClick={() => setOpen(true)}
      >
        <img src="/svg/show.svg" alt="show" className="w-6 h-6" />
      </button>
      {open && (
        <div className="bg-black/15 h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-background_s rounded-xl border border-secondary max-w-96 h-fit text-center p-3">
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
            <div className="px-4 py-5 text-gray-300  bg-secondary rounded-xl my-2 text-left gap-y-3 flex flex-col">
              <p>
                <span className="text-primary">Name: </span>
                {supplier?.name}
              </p>
              <p>
                <span className="text-primary">Address: </span>
                {supplier?.address}
              </p>
              <p>
                <span className="text-primary">Phone: </span>
                {supplier?.phone}
              </p>
              <p>
                <span className="text-primary">Email: </span>
                {supplier?.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
