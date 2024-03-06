export default function ShowLot({ lot }: { lot: any }) {
  return (
    <div className="px-4 py-5 text-gray-300  bg-secondary rounded-xl my-2 text-left gap-y-3 flex flex-col">
      <p>
        <span className="text-primary">Stock: </span>
        {lot?.stock}
      </p>
      <p>
        <span className="text-primary">Purchase Quantity: </span>
        {lot?.purchase_quantity}
      </p>
      <p>
        <span className="text-primary">Purchase Price Unit: </span>
        {lot?.purchase_price_unit}
      </p>
      <p>
        <span className="text-primary">Sale Price Unit: </span>
        {lot?.sale_price_unit}
      </p>
      <p>
        <span className="text-primary">Purchase Date: </span>
        {lot?.purchase_date}
      </p>
      <p>
        <span className="text-primary">Expiration Date: </span>
        {lot?.expiration_date}
      </p>
      <p>
        <span className="text-primary">Name Product: </span>
        {lot?.name_product}
      </p>
      <p>
        <span className="text-primary">Name Supplier: </span>
        {lot?.name_supplier}
      </p>
    </div>
  );
}
