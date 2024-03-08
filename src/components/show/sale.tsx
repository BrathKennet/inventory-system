export default function ShowSale({ sale }: { sale: any }) {
  return (
    <div className=" py-5 text-gray-300  bg-secondary rounded-xl my-2 text-left gap-y-3 flex flex-col ">
      <p className="px-4">
        <span className="text-primary">Client: </span>
        {sale?.name_client}
      </p>
      <p className="px-4">
        <span className="text-primary">Quantity Sold: </span>
        {sale?.quantity_sold}
      </p>
      <p className="px-4">
        <span className="text-primary">Total Sold: </span>
        {sale?.total_sold}
      </p>
      <p className="px-4">
        <span className="text-primary">Sale Date: </span>
        {sale?.sale_date}
      </p>
      <div className="h-[2px] bg-primary w-full "></div>
      <p className="px-4">
        <span className="text-primary">Details: </span>
      </p>
      {sale?.detail.map((v: any, i: number) => (
        <div key={i} className="flex flex-col gap-y-1 px-4">
          <p>
            <span className="text-primary">Product: </span>
            {v?.name_product}
          </p>
          <p>
            <span className="text-primary">Quantity: </span>
            {v?.quantity}
          </p>
          <p>
            <span className="text-primary">Price Unit: </span>
            {v?.price_unit}
          </p>
          <p>
            <span className="text-primary">Subtotal: </span>
            {v?.subtotal}
          </p>
          <div className="h-[1px] bg-primary w-full"></div>
        </div>
      ))}
    </div>
  );
}
