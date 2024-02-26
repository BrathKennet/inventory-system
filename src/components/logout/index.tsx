"use client";

import { logout } from "@/services/auth/form";
import { useFormState, useFormStatus } from "react-dom";

export default function Logout() {
  const [formState, formAction] = useFormState(logout, undefined);

  return (
    <div>
      <form action={formAction}>
        <Submit />
        <p className="text-yellow-700">
          {formState?.message && formState.message}
        </p>
      </form>
    </div>
  );
}

function Submit() {
  const status = useFormStatus();
  return (
    <button
      disabled={status.pending}
      className={`bg-red-600 hover:bg-opacity-80 duration-500 text-gray-300 px-2 py-1 w-[80%] rounded-lg ${
        status.pending ? "bg-opacity-80" : ""
      }`}
    >
      {status.pending ? "Logout ..." : "Logout"}
    </button>
  );
}
