export default function ShowSupplier({ supplier }: { supplier: any }) {
  return (
    <div className="px-4 py-5 text-gray-300  bg-secondary rounded-xl my-2 text-left gap-y-3 flex flex-col">
      <p>
        <span className="text-primary">Name: </span>
        {supplier?.name}
      </p>
      <p>
        <span className="text-primary">Address: </span>
        {supplier?.address}
      </p>
      <p>
        <span className="text-primary">Phone: </span>
        {supplier?.phone}
      </p>
      <p>
        <span className="text-primary">Email: </span>
        {supplier?.email}
      </p>
    </div>
  );
}