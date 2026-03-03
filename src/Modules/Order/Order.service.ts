import { TOrderProduct, TOrderStatus } from './Order.interface';
import { OrderProductModel } from './Order.model';

type Promiss = {
  success: boolean;
  message: string;
  data?: string | object;
};

const createOrderDblink = async (orderData: TOrderProduct) => {
  try {
    // Create the order
    const result = await OrderProductModel.create(orderData);
    
    return {
      success: true,
      message: 'Order created successfully',
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};

const getOrdersDblink = async (email?: string) => {
  let query = {};
  if (email) {
    query = { email };
  }
  const result = await OrderProductModel.find(query).sort({ createdAt: -1 });
  return result;
};

const getOrderById = async (orderId: string) => {
  const result = await OrderProductModel.findById(orderId);
  if (!result) {
    throw new Error('Order not found');
  }
  return result;
};

const updateOrderStatus = async (orderId: string, status: TOrderStatus) => {
  const order = await OrderProductModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

const getUserOrders = async (email: string) => {
  const orders = await OrderProductModel.find({ email }).sort({ createdAt: -1 });
  return orders;
};

const deleteOrder = async (orderId: string) => {
  const order = await OrderProductModel.findByIdAndDelete(orderId);
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

export const orderService = {
  createOrderDblink,
  getOrdersDblink,
  getOrderById,
  updateOrderStatus,
  getUserOrders,
  deleteOrder,
};