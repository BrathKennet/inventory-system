"use client";

import { useFormState } from "react-dom";
import InputGeneral from "../../input/input-general";
import SubmitButton from "../../buttons/submit";
import { addCategory } from "@/services/category/client";
import { TypeButton } from "@/models/enum_models";

export default function AddCategoryForm() {
  const [formState, formAction] = useFormState(addCategory, undefined);

  return (
    <div className="px-4 py-5 my-5 bg-secondary rounded-xl max-w-[450px] ">
      <div className="mx-auto">
        <form action={formAction} className="text-base sm:text-lg sm:leading-7">
          <div className="text-left">
            <h1 className="text-lg text-primary pb-1">Add Category</h1>
          </div>
          <div className="flex">
            <div className="w-full pr-8">
              <InputGeneral
                label=""
                id="name"
                name="name"
                placeholder="New category name"
                error={undefined}
              />
            </div>
            <div className="flex h-full w-44 place-self-end ">
              <SubmitButton
                type={TypeButton.PRIMARY}
                text="Submit"
                textPending="Submiting ..."
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
