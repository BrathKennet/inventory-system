"use client";

import { useFormState } from "react-dom";
import SubmitButton from "../../buttons/submit";
import { TypeDeleteForm } from "@/models/enum_models";
import { getDelete } from "@/utils/type-delete";
import { TypeButton } from "@/models/enum_models";

export default function DeleteGeneralForm({
  id,
  name,
  type,
}: {
  id: string;
  name: string;
  type: TypeDeleteForm;
}) {
  const [formState, formAction] = useFormState(getDelete(type), undefined);

  return (
    <div className="px-4 py-5 bg-secondary rounded-xl max-w-[500px] my-2">
      <div className="mx-auto">
        <form action={formAction} className="text-base sm:text-lg sm:leading-7">
          <div className="">
            <p className="text-lg text-primary">{`Are you sure to delete '${name}'?`}</p>
          </div>
          <div className="flex mt-10">
            <input id="id" name="id" className="hidden" defaultValue={id} />
            <div className="flex h-full w-44 mx-auto ">
              <SubmitButton
                type={TypeButton.DANGER}
                text="Delete"
                textPending="Deleting ..."
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
