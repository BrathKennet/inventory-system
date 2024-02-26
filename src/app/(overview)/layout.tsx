import dynamic from "next/dynamic";

const DynamicSidenav = dynamic(() => import("@/components/sidenav/nav"), {
  ssr: false,
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen ">
      <DynamicSidenav />
      <section className="w-full pt-12 px-8 overflow-y-auto">
        {children}
      </section>
    </main>
  );
}
