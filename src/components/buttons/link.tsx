import Link from "next/link";

export default function LinkButton({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      className="bg-primary text-background hover:bg-opacity-80 duration-500 rounded-md w-full px-2 py-1 text-base sm:text-lg "
      href={href}
    >
      {text}
    </Link>
  );
}
