"use client";

import { editCategory } from "@/services/category/client";
import { useFormState } from "react-dom";
import InputGeneral from "../../input/input-general";
import SubmitButton from "../../buttons/submit";
import { TypeButton } from "@/models/enum_models";

export default function EditCategoryForm({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [formState, formAction] = useFormState(editCategory, undefined);

  return (
    <div className="px-4 py-5 bg-secondary rounded-xl my-2">
      <div className="mx-auto">
        <form action={formAction} className="text-base sm:text-lg sm:leading-7">
          <div className="text-left">
            <h1 className="text-lg text-primary pb-1">Edit Category</h1>
          </div>
          <div className="flex ">
            <div className="w-full pr-8">
              <input id="id" name="id" className="hidden" defaultValue={id} />
              <InputGeneral
                label=""
                id="name"
                name="name"
                defaultValue={name}
                placeholder="New category name"
                error={undefined}
              />
            </div>
            <div className="flex h-f ull w-44 place-self-end ">
              <SubmitButton
                type={TypeButton.PRIMARY}
                text="Edit"
                textPending="Editing ..."
              />
            </div>
          </div>
          <p className="text-red-400">
            {formState?.errors && formState.errors.name}
            {formState?.message && formState.message}
          </p>
        </form>
      </div>
    </div>
  );
}
