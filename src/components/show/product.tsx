export default function ShowProduct({ product }: { product: any }) {
  return (
    <div className="px-4 py-5 text-gray-300  bg-secondary rounded-xl my-2 text-left gap-y-3 flex flex-col">
      <p>
        <span className="text-primary">Name: </span>
        {product?.name}
      </p>
      <p>
        <span className="text-primary">Category: </span>
        {product?.name_category}
      </p>
      <p>
        <span className="text-primary">Description: </span>
        {product?.description}
      </p>
      <p>
        <span className="text-primary">Total Stock: </span>
        {product?.total_stock}
      </p>
    </div>
  );
}
