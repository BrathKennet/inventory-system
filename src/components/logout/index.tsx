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
      className="bg-red-400 px-2 py-1 rounded-lg"
    >
      {status.pending ? "Logout ..." : "Logout"}
    </button>
  );
}
