import NavBar from "./navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen w-screen transition-colors"
      dir="rtl"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <NavBar />
      <div className="flex justify-center">
        <main className="max-w-6xl w-full">{children}</main>
      </div>
    </div>
  );
}
