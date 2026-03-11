
import "../src/styles/globals.scss"
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import { CartProvider } from "@/src/context/CardContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header/>
            {children}
          <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}
