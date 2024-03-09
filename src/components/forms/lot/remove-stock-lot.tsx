"use client";

import SubmitButton from "@/components/buttons/submit";
import { TypeButton } from "@/models/enum_models";
import { removeStockLot } from "@/services/lot/client";
import { useFormState } from "react-dom";

export default function RemoveStockLotForm({ lot }: { lot: any }) {
  const [formState, formAction] = useFormState(removeStockLot, undefined);

  return (
    <div className="px-4 py-5 bg-secondary rounded-xl max-w-[500px] my-2">
      <div className="mx-auto">
        <form action={formAction} className="text-base sm:text-lg sm:leading-7">
          <div className="">
            <p className="text-lg text-primary">{`Are you sure to remove Stock of '${lot.name_product}'?`}</p>
          </div>
          <div className="flex mt-10">
            <input id="id" name="id" className="hidden" defaultValue={lot.id} />
            <input
              id="stock"
              name="stock"
              className="hidden"
              defaultValue={lot.stock}
            />
            <input
              id="productId"
              name="productId"
              className="hidden"
              defaultValue={lot.id_product}
            />
            <input
              id="productName"
              name="productName"
              className="hidden"
              defaultValue={lot.name_product}
            />
            <div className="flex h-full w-44 mx-auto ">
              <SubmitButton
                type={TypeButton.DANGER}
                text="Remove Stock"
                textPending="Removing ..."
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
