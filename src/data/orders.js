// In-memory storage for serverless environments
let orders = [];

// Initialize with existing data if available (for development)
const initializeOrders = () => {
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
    try {
      const fs = require('fs');
      const path = require('path');
      const ordersFilePath = path.join(process.cwd(), 'src/data/orders.json');
      if (fs.existsSync(ordersFilePath)) {
        const data = fs.readFileSync(ordersFilePath, 'utf8');
        orders = JSON.parse(data);
        console.log('Loaded orders from file:', orders.length);
      }
    } catch (error) {
      console.error('Error loading orders from file:', error);
      orders = [];
    }
  }
};

// Initialize on module load
initializeOrders();

// Read orders from memory
export const getOrders = () => {
  console.log('Getting orders from memory:', orders.length);
  return orders;
};

// Save orders to memory (and file in development)
export const saveOrders = (newOrders) => {
  console.log('Saving orders to memory:', newOrders.length);
  orders = newOrders;
  
  // Save to file in development
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
    try {
      const fs = require('fs');
      const path = require('path');
      const ordersFilePath = path.join(process.cwd(), 'src/data/orders.json');
      fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
      console.log('Orders saved to file successfully');
    } catch (error) {
      console.error('Error saving orders to file:', error);
    }
  }
};

// Create a new order
export const createOrder = (orderData) => {
  console.log('Creating new order with data:', orderData);
  
  try {
    const newOrder = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    console.log('New order object:', newOrder);
    orders.push(newOrder);
    saveOrders(orders);
    console.log('Order created successfully:', newOrder.id);
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

// Get order by ID
export const getOrderById = (orderId) => {
  console.log('Getting order by ID:', orderId);
  const order = orders.find(order => order.id === orderId);
  console.log('Found order:', order ? order.id : 'not found');
  return order;
};

// Update order status
export const updateOrderStatus = (orderId, status) => {
  console.log('Updating order status:', orderId, status);
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    saveOrders(orders);
    console.log('Order status updated successfully');
    return orders[orderIndex];
  }
  
  console.log('Order not found for status update');
  return null;
}; 