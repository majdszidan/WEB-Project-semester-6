import NavBar from "./navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen  w-screen">
      <NavBar />
      <div className="w-full flex justify-center">
        <main className="max-w-6xl w-full">{children}</main>
      </div>
    </div>
  );
}
