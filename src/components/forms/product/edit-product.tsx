"use client";

import SubmitButton from "@/components/buttons/submit";
import InputGeneral from "@/components/input/input-general";
import SelectGeneral from "@/components/select/select-general";
import { TypeButton } from "@/models/enum_models";
import { editProduct } from "@/services/product/client";
import { useFormState } from "react-dom";

export default function EditProductForm({
  categories,
  product,
}: {
  categories: any[] | null;
  product: any;
}) {
  const [formState, formAction] = useFormState(editProduct, undefined);

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
                defaultValue={product.id}
              />
              <SelectGeneral
                id="categoryId"
                name="categoryId"
                label="Select a Category"
                options={categories}
                defaultValue={product.id_category}
                error={formState?.errors && formState.errors.categoryId}
              />
              <InputGeneral
                label="Name"
                id="name"
                name="name"
                placeholder="New product name"
                defaultValue={product.name}
                error={formState?.errors && formState.errors.name}
              />
              <InputGeneral
                label="Description"
                id="description"
                name="description"
                placeholder="New product description"
                defaultValue={product.description}
                error={formState?.errors && formState.errors.description}
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
