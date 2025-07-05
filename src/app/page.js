'use client';

import { useState, useContext } from 'react';
import { products, categories, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../components/CartContext';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useContext(CartContext);
  const filteredProducts = getProductsByCategory(selectedCategory);

  const scrollToProducts = () => {
    document.getElementById('products').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-24 flex items-center justify-center bg-background animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text font-sans">Premium Office Supplies</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-text/70 font-sans">
            Transform your workspace with our curated collection of high-quality office furniture, electronics, and accessories designed for productivity and comfort.
          </p>
          <button 
            onClick={scrollToProducts}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border-muted animate-fade-in" style={{animationDelay: '0.1s'}}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-text hover:bg-primary/10 border border-border-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background animate-fade-in" style={{animationDelay: '0.3s'}}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-text font-sans">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-text font-sans">Quality Guaranteed</h3>
              <p className="text-text/70 font-sans">All our products are carefully selected for quality and durability.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-text font-sans">Fast Delivery</h3>
              <p className="text-text/70 font-sans">Quick and reliable shipping to get your supplies when you need them.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-text font-sans">24/7 Support</h3>
              <p className="text-text/70 font-sans">Our customer service team is always here to help you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
