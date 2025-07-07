'use client';

import { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import Image from 'next/image';

export default function Cart() {
  const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image, // Add image URL to the request
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Checkout failed');
      }

      const data = await response.json();
      
      if (!data.url) {
        throw new Error('No checkout URL received');
      }

      // Don't clear cart here - only clear after successful payment
      // The cart will be cleared in the success page or webhook
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      
      // Provide more specific error messages
      let errorMessage = 'There was an error processing your checkout. Please try again.';
      
      if (error.message.includes('Payment service not available')) {
        errorMessage = 'Payment service is temporarily unavailable. Please try again later.';
      } else if (error.message.includes('Payment service not configured')) {
        errorMessage = 'Payment service is not properly configured. Please contact support.';
      } else if (error.message.includes('No valid items provided')) {
        errorMessage = 'Please add items to your cart before checkout.';
      } else if (error.message.includes('Invalid item structure')) {
        errorMessage = 'Some items in your cart are invalid. Please refresh and try again.';
      } else if (error.message.includes('Invalid price or quantity')) {
        errorMessage = 'Some items have invalid prices or quantities. Please refresh and try again.';
      } else if (error.message.includes('Invalid total amount')) {
        errorMessage = 'Invalid order total. Please refresh and try again.';
      } else if (error.message.includes('Failed to create order')) {
        errorMessage = 'Failed to create your order. Please try again.';
      } else if (error.message.includes('Card error')) {
        errorMessage = error.message;
      } else if (error.message.includes('Invalid request')) {
        errorMessage = 'Invalid checkout request. Please try again.';
      } else if (error.message.includes('Payment service error')) {
        errorMessage = 'Payment service error. Please try again.';
      } else if (error.message.includes('No checkout URL received')) {
        errorMessage = 'Failed to create checkout session. Please try again.';
      }
      
      alert(errorMessage);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in"
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-all duration-500 ease-out animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text">Shopping Cart</h2>
            </div>
            <button
              onClick={closeCart}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some products to get started!</p>
                <button
                  onClick={closeCart}
                  className="btn-primary px-6 py-3"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-200 shadow-sm">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      ) : (
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-lg font-bold text-blue-600">${item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 hover:text-red-600 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 p-6 space-y-4 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-3xl font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
              
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure checkout powered by Stripe</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 