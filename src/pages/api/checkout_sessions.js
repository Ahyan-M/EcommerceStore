// pages/api/checkout_sessions.js

import Stripe from 'stripe';
import { createOrder } from '../../data/orders';

// Initialize Stripe with error handling
let stripe;
try {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} catch (error) {
  console.error('Failed to initialize Stripe:', error);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Debug endpoint for configuration issues
  if (req.query.debug === 'true') {
    return res.status(200).json({
      stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
      stripeInitialized: !!stripe,
      nodeEnv: process.env.NODE_ENV,
      hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
      secretKeyLength: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.length : 0,
    });
  }

  // Validate Stripe configuration
  if (!stripe) {
    console.error('Stripe not initialized');
    return res.status(500).json({ message: 'Payment service not available' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY not configured');
    return res.status(500).json({ message: 'Payment service not configured' });
  }

  try {
    const { items } = req.body;

    // Validate request body
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('Invalid items in request:', items);
      return res.status(400).json({ message: 'No valid items provided' });
    }

    // Validate each item
    for (const item of items) {
      if (!item.id || !item.name || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
        console.error('Invalid item structure:', item);
        return res.status(400).json({ message: 'Invalid item structure' });
      }
      if (item.price <= 0 || item.quantity <= 0) {
        console.error('Invalid price or quantity:', item);
        return res.status(400).json({ message: 'Invalid price or quantity' });
      }
    }

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (total <= 0) {
      console.error('Invalid total amount:', total);
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    console.log('Creating order for items:', items.length, 'Total:', total);

    // Create order with error handling
    let order;
    try {
      order = createOrder({
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        customerInfo: {
          email: 'customer@example.com', // This would come from the form
        },
        total: total,
      });
    } catch (orderError) {
      console.error('Failed to create order:', orderError);
      return res.status(500).json({ message: 'Failed to create order' });
    }

    console.log('Created order:', order.id);

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: `Quantity: ${item.quantity}`,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: `${req.headers.origin}/`,
      metadata: {
        orderId: order.id,
        items: JSON.stringify(items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }))),
      },
    });

    console.log('Stripe session created:', session.id);
    res.status(200).json({ url: session.url, orderId: order.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Provide more specific error messages
    if (error.type === 'StripeCardError') {
      res.status(400).json({ message: 'Card error: ' + error.message });
    } else if (error.type === 'StripeInvalidRequestError') {
      res.status(400).json({ message: 'Invalid request: ' + error.message });
    } else if (error.type === 'StripeAPIError') {
      res.status(500).json({ message: 'Payment service error. Please try again.' });
    } else {
      res.status(500).json({ message: 'Error creating checkout session. Please try again.' });
    }
  }
}
