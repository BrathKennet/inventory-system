"use client";

export default function SelectLot({
  index,
  options,
  errorSelect,
  errorInput,
  handleChange,
  lotSelect,
  defaultValueQ,
}: {
  index: number;
  options: any[] | null;
  errorSelect?: string[];
  errorInput?: string[];
  handleChange: any;
  lotSelect: any;
  defaultValueQ?: any;
}) {
  const fechaHoy = new Date();
  fechaHoy.setDate(fechaHoy.getDate() - 1);

  return (
    <>
      <input
        id={`detailLot${index}`}
        name={`detailLot${index}`}
        className="hidden"
        value={`${lotSelect?.id}|${lotSelect?.name_product}|${lotSelect?.sale_price_unit}|${lotSelect?.stock}|${lotSelect?.id_product}`}
        readOnly
      />
      <div className="w-full">
        <label
          htmlFor={`lotId${index}`}
          className="left-0 text-primary text-sm"
        >
          Select a Product
        </label>
        <select
          id={`lotId${index}`}
          name={`lotId${index}`}
          className="h-10 w-full border-b-2 border-gray-300 text-gray-300 focus:border-primary focus:outline-none bg-secondary text-base"
          defaultValue={lotSelect != undefined ? lotSelect.id : ""}
          onChange={(event) => {
            handleChange(index, event);
          }}
        >
          <option className="hidden" value="" disabled>
            Select a Product
          </option>
          {lotSelect && (
            <option
              key={lotSelect.id}
              value={lotSelect.id}
              /* disabled={new Date(lotSelect.expiration_date) < fechaHoy} */
            >
              {`Product: ${lotSelect.name_product} - Price Unit: ${lotSelect.sale_price_unit} - Stock: ${lotSelect.stock} - Expiration: ${lotSelect.expiration_date}`}
            </option>
          )}
          {options?.map((v) => (
            <option
              key={v.id}
              value={v.id}
              disabled={new Date(v.expiration_date) < fechaHoy}
            >
              {`Product: ${v.name_product} - Price Unit: ${v.sale_price_unit} - Stock: ${v.stock} - Expiration: ${v.expiration_date}`}
            </option>
          ))}
        </select>
        <p className="text-red-400 text-base">
          {errorSelect && errorSelect[0]}
        </p>
      </div>
      <div className="w-full">
        <label
          htmlFor={`quantityId${index}`}
          className="left-0 text-primary text-sm"
        >
          Quantity{" "}
          {lotSelect &&
            lotSelect?.stock != "" &&
            `/ Max Stock: ${lotSelect?.stock}`}
        </label>
        <input
          id={`quantityId${index}`}
          name={`quantityId${index}`}
          type={"text"}
          placeholder={"0"}
          defaultValue={defaultValueQ}
          className="placeholder-slate-500 h-10 w-full border-b-2 border-gray-300 text-gray-300 focus:outline-none focus:border-primary bg-transparent text-base disabled:text-gray-400 disabled:border-gray-400 "
        />
        <p className="text-red-400 text-base">{errorInput && errorInput[0]}</p>
      </div>
    </>
  );
}
