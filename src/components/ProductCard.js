'use client';

import Link from 'next/link';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card group relative pb-20 bg-white rounded-xl border border-border-muted hover:shadow-lg hover:scale-[1.02] transition-all duration-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 animate-fade-in">
      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 bg-background overflow-hidden flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain h-full w-full transition-transform duration-200 group-hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
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