'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card group relative pb-20 bg-white rounded-xl border border-border-muted hover:shadow-lg hover:scale-[1.02] transition-all duration-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 animate-fade-in">
      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 bg-background overflow-hidden flex items-center justify-center">
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-200 group-hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-text/40">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Image unavailable</p>
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
              {product.stock} in stock
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text/60 font-medium uppercase tracking-wide">{product.category}</span>
          <div className="flex items-center">
            <span className="text-primary">★</span>
            <span className="text-xs text-text ml-1">{product.rating}</span>
            <span className="text-xs text-text/40 ml-1">({product.reviews?.length || 0})</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-bold text-text mb-2 group-hover:text-primary transition-colors cursor-pointer font-sans">
            {product.name}
          </h3>
        </Link>

        <p className="text-text/70 text-sm mb-3 line-clamp-2 font-sans">
          {product.description}
        </p>

        {/* Features */}
        {product.features && Array.isArray(product.features) && product.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-background text-text/60 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="text-xs text-text/40">+{product.features.length - 2} more</span>
              )}
            </div>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="absolute left-0 bottom-0 w-full px-4 pb-4 flex items-center justify-between bg-white bg-opacity-95">
          <span className="text-xl font-bold text-primary">${product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="btn-primary text-xs md:text-sm px-4 py-2 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 