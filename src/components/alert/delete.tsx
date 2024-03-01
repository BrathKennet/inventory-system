"use client";

import { useState } from "react";
import DeleteGeneralForm from "../forms/general/delete";
import { TypeDeleteForm } from "@/models/enum_models";

export default function DeleteAlert({
  id,
  name,
  type,
}: {
  id: string;
  name: string;
  type: TypeDeleteForm;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="hover:brightness-125 duration-500 "
        onClick={() => setOpen(true)}
      >
        <img src="/svg/delete.svg" alt="delete" className="w-6 h-6" />
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
            <DeleteGeneralForm id={id} name={name} type={type} />
          </div>
        </div>
      )}
    </>
  );
}
