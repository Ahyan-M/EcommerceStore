'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderDetails() {
      if (orderId) {
        try {
          const response = await fetch(`/api/orders?id=${orderId}`);
          if (response.ok) {
            const order = await response.json();
            setOrderDetails(order);
          }
        } catch (error) {
          // handle error
        }
      }
      setLoading(false);
    }
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text/70">Processing your order...</p>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-4">Order Not Found</h1>
          <Link href="/" className="btn-primary">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-text mb-2 font-sans">
              Thank you for your order!
            </h1>
            <p className="text-text/70 font-sans">
              Your order has been successfully placed and payment has been processed.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-border-muted p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 text-text font-sans">Order Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-text/60">Order ID:</span>
                <span className="font-medium text-text">{orderDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">Order Date:</span>
                <span className="font-medium text-text">
                  {new Date(orderDetails.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">Status:</span>
                <span className={`font-medium ${
                  orderDetails.status === 'paid' ? 'text-secondary' : 'text-primary'
                }`}>
                  {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">Total Amount:</span>
                <span className="font-bold text-lg text-primary">${orderDetails.total}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3 text-text font-sans">Items Ordered:</h3>
              <div className="space-y-2">
                {orderDetails.items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border-muted">
                    <div>
                      <span className="font-medium text-text">{item.name}</span>
                      <span className="text-text/50 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="text-text/70">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary/5 rounded-xl p-6 mb-8 border border-primary/10">
            <h3 className="font-semibold text-primary mb-3 font-sans">What&apos;s Next?</h3>
            <ul className="space-y-2 text-text/70">
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                You&apos;ll receive an order confirmation email shortly
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                We&apos;ll process your order and ship it within 1-2 business days
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                You&apos;ll receive tracking information once your order ships
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/"
              className="flex-1 btn-primary text-center py-3"
            >
              Continue Shopping
            </Link>
            <Link 
              href="/admin"
              className="flex-1 btn-secondary text-center py-3"
            >
              View All Orders
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center text-text/60">
            <p className="font-sans">Have questions about your order?</p>
            <p className="text-sm font-sans">
              Contact us at&nbsp;
              <a href="mailto:support@amsupply.com" className="text-primary hover:underline">
                support@amsupply.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 