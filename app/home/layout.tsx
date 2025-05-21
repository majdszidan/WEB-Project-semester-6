import NavBar from "./navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen  w-screen bg-[#275287]">
      <NavBar />
      <main className="">{children}</main>
    </div>
  );
}
