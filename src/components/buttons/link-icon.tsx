import Link from "next/link";

export default function LinkIcon({ href, src, alt }: { href:string; src:string; alt:string }) {
  return (
    <Link href={href} className="hover:brightness-125 duration-500 ">
      <img src={src} alt={alt} className="w-6 h-6" />
    </Link>
  );
}