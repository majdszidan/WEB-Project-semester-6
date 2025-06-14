import NavBar from "./navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div dir="rtl" className="min-h-screen  w-screen bg-[#275287]">
      <NavBar />
      <div className="w-full flex justify-center">
        <main className="max-w-6xl w-full">{children}</main>
      </div>
    </div>
  );
}
