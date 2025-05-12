import NavBar from "./navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen ">
      <NavBar />
      {children}
    </div>
  );
}
