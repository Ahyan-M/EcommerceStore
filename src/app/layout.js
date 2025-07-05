import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { CartProvider } from "../components/CartContext";
import Cart from "../components/Cart";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AM Supply - Office Supplies",
  description: "Premium office supplies and equipment for your business needs",
};

function Footer() {
  return (
    <footer className="bg-background border-t border-border-muted text-text py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Image src="/images/logo (10).png" alt="Logo" width={32} height={32} className="object-contain" />
            <span className="font-bold text-lg">AM Supply</span>
          </div>
          <nav className="flex space-x-6 text-sm">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="/" className="hover:text-primary transition-colors">Products</Link>
          </nav>
          <div className="text-xs text-gray-400">&copy; {new Date().getFullYear()} AM Supply. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-background text-text font-sans min-h-screen flex flex-col" suppressHydrationWarning={true}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <Cart />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
