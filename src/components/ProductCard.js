'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Reset image error when product changes
  useEffect(() => {
    setImageError(false);
  }, [product.id]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="product-card group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {!imageError ? (
            <img
              key={product.id}
              src={`${product.image}?v=${product.id}`}
              alt={product.name}
              className="object-contain w-full h-full transition-all duration-500 group-hover:scale-110"
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium">Image unavailable</p>
              </div>
            </div>
          )}
          
          {/* Stock Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              {product.stock} in stock
            </span>
          </div>

          {/* Quick View Overlay */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <span className="bg-white text-text px-4 py-2 rounded-lg font-medium text-sm shadow-lg">
              Quick View
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6">
        {/* Category and Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium ml-1">
              {product.rating}
            </span>
            <span className="text-xs text-gray-400">
              ({product.reviews?.length || 0})
            </span>
          </div>
        </div>

        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 cursor-pointer line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        {product.features && Array.isArray(product.features) && product.features.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 3 && (
                <span className="text-xs text-gray-500 font-medium">
                  +{product.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="btn-primary text-sm px-6 py-2.5 font-semibold hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 