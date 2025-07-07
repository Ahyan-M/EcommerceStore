'use client';

import { useState, useEffect, useContext } from 'react';
import { useParams } from 'next/navigation';
import { getProductById, products } from '../../../data/products';
import Link from 'next/link';
import { CartContext } from '../../../components/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (params.id) {
      const foundProduct = getProductById(params.id);
      setProduct(foundProduct);
      setLoading(false);
      setImageError(false); // Reset image error state when product changes
    }
  }, [params.id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    // Optionally, show a non-intrusive message here
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text/70">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-4">Product Not Found</h1>
          <Link href="/" className="btn-primary">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  // Find related products (same category, not current product)
  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-text/60">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {product.category}
                </Link>
              </li>
              <li>/</li>
              <li className="text-text">{product.name}</li>
            </ol>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm border border-border-muted overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="relative h-96 bg-background rounded-xl overflow-hidden flex items-center justify-center">
                {!imageError ? (
                <img
                  key={product.id}
                  src={`${product.image}?v=${product.id}`}
                  alt={product.name}
                  className="object-contain w-full h-full"
                  onError={handleImageError}
                />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-text/40">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg">Image unavailable</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-secondary text-white text-sm px-3 py-1 rounded-full">
                    {product.stock} in stock
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <span className="text-primary font-medium text-sm uppercase tracking-wide">{product.category}</span>
                  <h1 className="text-3xl font-bold text-text mt-2 font-sans">{product.name}</h1>
                  <div className="mt-3">
                    <div className="flex items-center">
                      <span className="text-primary text-xl">★</span>
                      <span className="text-text ml-1">{product.rating}</span>
                      <span className="text-text/40 ml-1">({product.reviews?.length || 0} reviews)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-4xl font-bold text-primary">${product.price}</span>
                </div>

                <div>
                  <p className="text-text/70 leading-relaxed font-sans">{product.detailedDescription || product.description}</p>
                </div>

                {/* Materials & Dimensions */}
                <div className="flex flex-wrap gap-6">
                  {product.materials && (
                    <div>
                      <span className="text-text font-medium">Materials:</span>
                      <ul className="list-disc list-inside text-text/70 text-sm mt-1">
                        {product.materials.map((mat, idx) => (
                          <li key={idx}>{mat}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {product.dimensions && (
                    <div>
                      <span className="text-text font-medium">Dimensions:</span>
                      <div className="text-text/70 text-sm mt-1">{product.dimensions}</div>
                    </div>
                  )}
                </div>

                {/* Features */}
                {product.features && Array.isArray(product.features) && product.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-text mb-3 font-sans">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-4 h-4 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-text/70 font-sans">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-text">Quantity:</label>
                    <div className="flex items-center border border-border-muted rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-text/60 hover:bg-background transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x border-border-muted">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-text/60 hover:bg-background transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full btn-primary py-4 text-lg"
                  >
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </button>

                  <div className="text-center text-sm text-text/50">
                    Free shipping on orders over $50
                  </div>
                </div>

                {/* Additional Info */}
                <div className="border-t border-border-muted pt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text/60">SKU:</span>
                    <span className="font-medium text-text">{product.sku}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text/60">Availability:</span>
                    <span className="text-secondary font-medium">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text/60">Shipping:</span>
                    <span className="font-medium text-text">Free on orders over $50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-text mb-8 font-sans">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="bg-white rounded-xl border border-border-muted p-4 hover:shadow-md transition-shadow">
                    <div className="h-32 bg-background rounded-lg mb-3 flex items-center justify-center">
                      <img
                        key={relatedProduct.id}
                        src={`${relatedProduct.image}?v=${relatedProduct.id}`}
                        alt={relatedProduct.name}
                        className="object-contain w-full h-full"
                        onError={(e) => { 
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden items-center justify-center w-full h-full text-text/40">
                        <div className="text-center">
                          <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs">No image</p>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-text mb-1 font-sans">{relatedProduct.name}</h3>
                    <p className="text-primary font-bold">${relatedProduct.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 