export default function ShowPerson({ person }: { person: any }) {
  return (
    <div className="px-4 py-5 text-gray-300  bg-secondary rounded-xl my-2 text-left gap-y-3 flex flex-col">
      <p>
        <span className="text-primary">Name: </span>
        {person?.name}
      </p>
      <p>
        <span className="text-primary">Address: </span>
        {person?.address}
      </p>
      <p>
        <span className="text-primary">Phone: </span>
        {person?.phone}
      </p>
      <p>
        <span className="text-primary">Email: </span>
        {person?.email}
      </p>
    </div>
  );
}
