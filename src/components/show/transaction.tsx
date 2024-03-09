export default function ShowTransaction({ transaction }: { transaction: any }) {
  return (
    <div className="px-4 py-5 text-gray-300  bg-secondary rounded-xl my-2 text-left gap-y-3 flex flex-col">
      <p>
        <span className="text-primary">Product: </span>
        {transaction?.name_product}
      </p>
      <p>
        <span className="text-primary">Quantity: </span>
        {transaction?.quantity}
      </p>
      <p>
        <span className="text-primary">Transaction Date: </span>
        {transaction?.transaction_date}
      </p>
      <p>
        <span className="text-primary">Type: </span>
        {transaction?.id_type}
      </p>
    </div>
  );
}
