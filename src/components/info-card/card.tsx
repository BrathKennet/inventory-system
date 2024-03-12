export default function InfoCard({
  title,
  quantity,
}: {
  title: string;
  quantity: string;
}) {
  return (
    <div className="border-dotted border-2 rounded-lg border-primary w-[130px] px-2 py-3 font-bold text-center bg-secondary/30 hover:scale-105 hover:bg-secondary/50 duration-500">
      <p className="uppercase text-base">{title}</p>
      <div className="h-[1px] w-full bg-primary my-2"></div>
      <p className="text-lg tracking-widest">{quantity}</p>
    </div>
  );
}
