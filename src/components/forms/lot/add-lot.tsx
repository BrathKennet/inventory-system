"use client";

import SubmitButton from "@/components/buttons/submit";
import InputGeneral from "@/components/input/input-general";
import SelectGeneral from "@/components/select/select-general";
import { TypeButton } from "@/models/enum_models";
import { addLot } from "@/services/lot/client";
import { useFormState } from "react-dom";

export default function AddLotForm({
  products,
  suppliers,
  idProduct,
  idSupplier,
}: {
  products: any[] | null;
  suppliers: any[] | null;
  idProduct?: string;
  idSupplier?: string;
}) {
  const [formState, formAction] = useFormState(addLot, undefined);

  return (
    <div className="px-4 py-5 bg-secondary rounded-xl max-w-[800px] mx-auto mt-20 ">
      <div className="mx-auto">
        <form action={formAction} className="text-base sm:text-lg sm:leading-7">
          <div className="flex flex-col items-center w-full">
            <div className="w-[98%] grid sm:grid-cols-2 grid-cols-1 gap-6 mt-4 ">
              <SelectGeneral
                id="productId"
                name="productId"
                label="Select a Product"
                options={products}
                defaultValue={idProduct}
                error={formState?.errors && formState.errors.productId}
              />
              <SelectGeneral
                id="supplierId"
                name="supplierId"
                label="Select a Supplier"
                options={suppliers}
                defaultValue={idSupplier}
                error={formState?.errors && formState.errors.supplierId}
              />
              <InputGeneral
                label="Purchase Quantity / Initial Stock"
                id="purchaseQuantity"
                name="purchaseQuantity"
                placeholder="0"
                error={formState?.errors && formState.errors.purchaseQuantity}
              />
              <InputGeneral
                label="Purchase Price Unit"
                id="purchasePriceUnit"
                name="purchasePriceUnit"
                placeholder="0.00"
                error={formState?.errors && formState.errors.purchasePriceUnit}
              />
              <InputGeneral
                label="Sale Price Unit"
                id="salePriceUnit"
                name="salePriceUnit"
                placeholder="0.00"
                error={formState?.errors && formState.errors.salePriceUnit}
              />
              <InputGeneral
                label="Purchase Date"
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                error={formState?.errors && formState.errors.purchaseDate}
              />
              <InputGeneral
                label="Expiration Date"
                type="date"
                id="expirationDate"
                name="expirationDate"
                error={formState?.errors && formState.errors.expirationDate}
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
