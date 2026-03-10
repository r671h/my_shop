
import "../src/styles/globals.scss"
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
