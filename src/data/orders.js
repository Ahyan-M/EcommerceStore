import fs from 'fs';
import path from 'path';

const ordersFilePath = path.join(process.cwd(), 'src/data/orders.json');

// Initialize orders file if it doesn't exist
const initializeOrdersFile = () => {
  console.log('Initializing orders file at:', ordersFilePath);
  if (!fs.existsSync(ordersFilePath)) {
    console.log('Orders file does not exist, creating it...');
    fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2));
    console.log('Orders file created successfully');
  } else {
    console.log('Orders file already exists');
  }
};

// Read orders from file
export const getOrders = () => {
  console.log('Getting orders from file...');
  initializeOrdersFile();
  try {
    const data = fs.readFileSync(ordersFilePath, 'utf8');
    const orders = JSON.parse(data);
    console.log('Read orders:', orders.length);
    return orders;
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
};

// Save orders to file
export const saveOrders = (orders) => {
  console.log('Saving orders to file:', orders.length);
  initializeOrdersFile();
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
    console.log('Orders saved successfully');
  } catch (error) {
    console.error('Error saving orders:', error);
  }
};

// Create a new order
export const createOrder = (orderData) => {
  console.log('Creating new order with data:', orderData);
  const orders = getOrders();
  const newOrder = {
    id: `ORD-${Date.now()}`,
    ...orderData,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  
  console.log('New order object:', newOrder);
  orders.push(newOrder);
  saveOrders(orders);
  console.log('Order created successfully:', newOrder.id);
  return newOrder;
};

// Get order by ID
export const getOrderById = (orderId) => {
  console.log('Getting order by ID:', orderId);
  const orders = getOrders();
  const order = orders.find(order => order.id === orderId);
  console.log('Found order:', order ? order.id : 'not found');
  return order;
};

// Update order status
export const updateOrderStatus = (orderId, status) => {
  console.log('Updating order status:', orderId, status);
  const orders = getOrders();
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