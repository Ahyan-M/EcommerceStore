'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import Image from 'next/image';

export default function Header() {
  const { cart, openCart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur border-b border-border-muted sticky top-0 z-50 transition-all">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/logo (10).png" alt="Logo" width={40} height={40} className="object-contain" priority />
              {/* Optionally, add a visually hidden company name for accessibility */}
              <span className="sr-only">AM Supply</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {[
              { href: '/', label: 'Home' },
              { href: '/', label: 'Products' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text font-medium px-2 py-1 rounded relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </Link>
            ))}
          </nav>

          {/* Cart Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative p-2 text-text hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Open cart"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.5l1.591 10.138A2.25 2.25 0 005.98 19.5h12.04a2.25 2.25 0 002.139-1.862L21.75 7.5m-16.5 0h16.5m-16.5 0A2.25 2.25 0 015.98 5.25h12.04a2.25 2.25 0 012.23 2.25m-4.23 0V5.25A3.75 3.75 0 0012 1.5a3.75 3.75 0 00-3.75 3.75v2.25" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all">
                  {cartCount}
                </span>
              )}
            </button>
            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 text-text hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open navigation menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {mobileOpen && (
          <nav className="md:hidden flex flex-col space-y-2 py-4 animate-fade-in">
            {[
              { href: '/', label: 'Home' },
              { href: '/', label: 'Products' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text font-medium px-2 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
} 