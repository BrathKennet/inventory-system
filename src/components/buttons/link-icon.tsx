import Link from "next/link";

export default function LinkIcon({ href, src, alt, title }: { href:string; src:string; alt:string, title: string }) {
  return (
    <Link href={href} className="hover:brightness-125 duration-500 ">
      <img src={src} alt={alt} className="w-6 h-6" title={title} />
    </Link>
  );
}