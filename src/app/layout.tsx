import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <Link href={"/"}>Home</Link>
          <Link href={"/pages/about-us"}>About us</Link>
          <Link href={"/pages/products"}>products</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
