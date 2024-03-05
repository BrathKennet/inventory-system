export default function ShowCategory({ category }: { category: any }) {
  return (
    <div className="px-4 py-5 text-gray-300  bg-secondary rounded-xl my-2 text-left gap-y-3 flex flex-col">
      <p>
        <span className="text-primary">Name: </span>
        {category?.name}
      </p>
      <p>
        <span className="text-primary">Total Products: </span>
        {category?.product_count}
      </p>
    </div>
  );
}