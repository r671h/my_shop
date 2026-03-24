
import "./src/styles/globals.scss"
import Header from "@/app/src/components/Header/Header";
import Footer from "@/app/src/components/Footer/Footer";
import { CartProvider } from "@/app/src/context/CartContext";
import { AuthProvider } from "./src/context/AuthConext";
import { AddressProvider } from "./src/context/AddressesContext";
import { OrdersProvider } from "./src/context/OrdersContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AddressProvider>
            <OrdersProvider>
              <CartProvider>
                <Header/>
                  {children}
                <Footer/>
              </CartProvider>
            </OrdersProvider>
          </AddressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
