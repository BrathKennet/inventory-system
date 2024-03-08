"use client";

import { TypeButton } from "@/models/enum_models";
import clsx from "clsx";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  type,
  text,
  textPending,
}: {
  type: TypeButton;
  text: string;
  textPending: string;
}) {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      disabled={status.pending}
      className={clsx(
        "hover:bg-opacity-80 duration-500 rounded-md w-full px-2 py-1",
        { "bg-opacity-80": status.pending },
        { "bg-primary text-background": type === TypeButton.PRIMARY },
        { "bg-red-600 text-gray-300": type === TypeButton.DANGER }
      )}
    >
      {status.pending ? textPending : text}
    </button>
  );
}
