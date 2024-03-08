"use client";

import SubmitButton from "@/components/buttons/submit";
import InputGeneral from "@/components/input/input-general";
import { TypeButton } from "@/models/enum_models";
import { editClient } from "@/services/client/client";
import { useFormState } from "react-dom";

export default function EditClientForm({ client }: { client: any }) {
  const [formState, formAction] = useFormState(editClient, undefined);

  return (
    <div className="px-4 py-5 bg-secondary rounded-xl max-w-[800px] mx-auto mt-20 ">
      <div className="mx-auto">
        <form action={formAction} className="text-base sm:text-lg sm:leading-7">
          <div className="flex flex-col items-center w-full">
            <div className="w-[98%] grid sm:grid-cols-2 grid-cols-1 gap-6 mt-4 ">
              <input
                id="id"
                name="id"
                className="hidden"
                defaultValue={client.id}
              />
              <InputGeneral
                label="Name"
                id="name"
                name="name"
                placeholder="New client name"
                defaultValue={client.name}
                error={formState?.errors && formState.errors.name}
              />
              <InputGeneral
                label="Address"
                id="address"
                name="address"
                placeholder="New client address"
                defaultValue={client.address}
                error={formState?.errors && formState.errors.address}
              />
              <InputGeneral
                label="Phone"
                id="phone"
                name="phone"
                placeholder="New client phone"
                defaultValue={client.phone}
                error={formState?.errors && formState.errors.phone}
              />
              <InputGeneral
                label="Email"
                id="email"
                name="email"
                placeholder="New client email"
                defaultValue={client.email}
                error={formState?.errors && formState.errors.email}
              />
            </div>
            <div className="h-full w-44 mt-10">
              <SubmitButton
                type={TypeButton.PRIMARY}
                text="Submit"
                textPending="Submiting ..."
              />
            </div>
          </div>
          <p className="text-red-400">
            {formState?.message && formState.message}
          </p>
        </form>
      </div>
    </div>
  );
}
