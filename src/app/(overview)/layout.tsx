import Sidenav from "@/components/sidenav/nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen ">
      <Sidenav />
      <section className="w-full pt-12 px-8 overflow-y-auto">
        {children}
      </section>
    </main>
  );
}
