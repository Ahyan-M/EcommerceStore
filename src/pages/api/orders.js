import { createOrder, getOrders, getOrderById, updateOrderStatus } from '../../data/orders';

export default async function handler(req, res) {
  console.log('Orders API called:', req.method, req.query);
  
  switch (req.method) {
    case 'POST':
      try {
        const { items, customerInfo, total } = req.body;
        console.log('Creating order with:', { items, customerInfo, total });
        
        if (!items || !customerInfo || !total) {
          console.log('Missing required fields');
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const order = createOrder({
          items,
          customerInfo,
          total,
          status: 'pending'
        });

        console.log('Order created:', order.id);
        res.status(201).json(order);
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order' });
      }
      break;

    case 'GET':
      try {
        const { id } = req.query;
        console.log('Getting order with id:', id);
        
        if (id) {
          const order = getOrderById(id);
          console.log('Found order:', order ? order.id : 'not found');
          if (!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
          res.status(200).json(order);
        } else {
          const orders = getOrders();
          console.log('Getting all orders, count:', orders.length);
          res.status(200).json(orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        const { status } = req.body;
        console.log('Updating order status:', id, status);
        
        if (!id || !status) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedOrder = updateOrderStatus(id, status);
        if (!updatedOrder) {
          return res.status(404).json({ message: 'Order not found' });
        }

        console.log('Order updated:', updatedOrder.id);
        res.status(200).json(updatedOrder);
      } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Error updating order' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
} 