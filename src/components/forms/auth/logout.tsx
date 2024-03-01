"use client";

import { logout } from "@/services/auth/client";
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "../../buttons/submit";
import { TypeButton } from "@/models/enum_models";

export default function Logout() {
  const [formState, formAction] = useFormState(logout, undefined);

  return (
    <div>
      <form action={formAction}>
        <SubmitButton
          type={TypeButton.DANGER}
          text="Logout"
          textPending="Logout ..."
        />
        <p className="text-yellow-700">
          {formState?.message && formState.message}
        </p>
      </form>
    </div>
  );
}
