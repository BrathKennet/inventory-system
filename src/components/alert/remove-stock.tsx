"use client";

import { useState } from "react";
import RemoveStockLotForm from "../forms/lot/remove-stock-lot";

export default function RemoveStockAlert({ lot }: { lot: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="hover:brightness-125 duration-500 "
        onClick={() => setOpen(true)}
      >
        <img
          src="/svg/remove.svg"
          alt="delete"
          className="w-6 h-6"
          title="delete"
        />
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
            <RemoveStockLotForm lot={lot} />
          </div>
        </div>
      )}
    </>
  );
}
