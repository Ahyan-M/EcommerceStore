'use client';

import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import Image from 'next/image';

export default function Header() {
  const { cart, openCart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image 
                  src="/images/Logo (10).png" 
                  alt="AM Supply Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain transition-transform duration-300 group-hover:scale-110" 
                  priority 
                />
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">AM Supply</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: '/', label: 'Home' },
              { href: '/', label: 'Products' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((item, index) => (
              <Link
                key={`${item.label}-${index}`}
                href={item.href}
                className="relative text-gray-900 font-medium px-3 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 group hover:text-blue-600"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 bg-blue-500/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
              </Link>
            ))}
          </nav>

          {/* Cart Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={openCart}
              className="relative p-2 text-gray-900 hover:text-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg hover:bg-blue-500/5 group"
              aria-label="Open cart"
            >
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.5l1.591 10.138A2.25 2.25 0 005.98 19.5h12.04a2.25 2.25 0 002.139-1.862L21.75 7.5m-16.5 0h16.5m-16.5 0A2.25 2.25 0 015.98 5.25h12.04a2.25 2.25 0 012.23 2.25m-4.23 0V5.25A3.75 3.75 0 0012 1.5a3.75 3.75 0 00-3.75 3.75v2.25" />
              </svg>
                              {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-scale-in shadow-sm">
                    {cartCount}
                  </span>
                )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-900 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg hover:bg-blue-500/5 transition-all duration-300"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open navigation menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute inset-0 transform transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16" />
                  </svg>
                </span>
                <span className={`absolute inset-0 transform transition-all duration-300 ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
                  </svg>
                </span>
                <span className={`absolute inset-0 transform transition-all duration-300 ${mobileOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16" />
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/', label: 'Products' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((item, index) => (
                              <Link
                  key={`${item.label}-${index}`}
                  href={item.href}
                  className="block text-gray-900 font-medium px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:bg-blue-500/5 hover:text-blue-600"
                  onClick={() => setMobileOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
} 