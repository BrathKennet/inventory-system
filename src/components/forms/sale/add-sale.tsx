"use client";

import SubmitButton from "@/components/buttons/submit";
import InputGeneral from "@/components/input/input-general";
import SelectGeneral from "@/components/select/select-general";
import SelectLot from "@/components/select/select-lot";
import { TypeButton } from "@/models/enum_models";
import { addSale } from "@/services/sale/client";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function AddSaleForm({
  clients,
  lots,
  idClient,
}: {
  clients: any[] | null;
  lots: any[] | null;
  idClient?: string;
}) {
  const [formState, formAction] = useFormState(addSale, undefined);
  const [listSelect, setListSelect] = useState<any[]>([]);
  const [availableLots, setAvailableLots] = useState(lots);
  const [listLot, setListLot] = useState(Array(1).fill(""));

  const addLot = () => {
    setListLot(Array(listLot.length + 1).fill(""));
  };

  const removeLot = () => {
    setListLot(Array(listLot.length - 1).fill(""));
    const newListSelect = [...listSelect];
    newListSelect.pop();
    setListSelect(newListSelect);

    updateAvaliableLots(newListSelect);
  };

  const updateAvaliableLots = (newListSelect: any[]) => {
    const updateLots = lots && [...lots];

    for (let i = 0; i < newListSelect.length; i++) {
      if (newListSelect[i] != undefined) {
        const indexSelect = updateLots?.findIndex(
          (v) => v.id === newListSelect[i].id
        );
        if (indexSelect !== -1 && indexSelect != undefined) {
          updateLots?.splice(indexSelect, 1);
        }
      }
    }
    setAvailableLots(updateLots);
  };

  const handleChange = (index: number, event: any) => {
    const value = event.target.value;
    const newListSelect = [...listSelect];
    const indexSelect = lots?.findIndex((v) => v.id === value);
    if (lots && indexSelect != undefined && indexSelect !== -1) {
      newListSelect[index] = lots[indexSelect];
    }
    setListSelect(newListSelect);

    updateAvaliableLots(newListSelect);
  };

  return (
    <div className="px-4 py-5 bg-secondary rounded-xl max-w-[800px] mx-auto mt-20 ">
      <div className="mx-auto">
        <form action={formAction} className="text-base sm:text-lg sm:leading-7">
          <div className="flex flex-col items-center w-full">
            <div className="w-[98%] grid sm:grid-cols-2 grid-cols-1 gap-6 mt-4 ">
              <input
                id="numberSelect"
                name="numberSelect"
                className="hidden"
                value={listLot.length}
                readOnly
              />
              <SelectGeneral
                id="clientId"
                name="clientId"
                label="Select a Client"
                options={clients}
                defaultValue={idClient}
                error={formState?.errors && formState.errors.clientId}
              />
              <InputGeneral
                label="Sale Date"
                type="date"
                id="saleDate"
                name="saleDate"
                error={formState?.errors && formState.errors.saleDate}
              />
              {listLot.map((v, i) => (
                <SelectLot
                  key={i}
                  index={i}
                  options={availableLots}
                  errorSelect={
                    formState?.errorsSelect &&
                    formState.errorsSelect[i] &&
                    formState.errorsSelect[i].lotId
                  }
                  errorInput={
                    formState?.errorsSelect &&
                    formState.errorsSelect[i] &&
                    formState.errorsSelect[i].quantityId
                  }
                  handleChange={handleChange}
                  lotSelect={listSelect[i]}
                />
              ))}
              <button
                type="button"
                className="hover:bg-opacity-80 duration-500 rounded-md w-full px-2 py-1 bg-primary text-background"
                onClick={addLot}
              >
                Add Product
              </button>
              {listLot.length > 1 && (
                <button
                  type="button"
                  className="hover:bg-opacity-80 duration-500 rounded-md w-full px-2 py-1 bg-red-600 text-gray-300"
                  onClick={removeLot}
                >
                  Remove Product
                </button>
              )}
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
