import NavBar from "./navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen w-full transition-colors"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <NavBar />
      <div className=" flex w-full justify-center">
        <main className="max-w-6xl w-full">{children}</main>
      </div>
    </div>
  );
}
