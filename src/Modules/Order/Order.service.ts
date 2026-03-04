import { Order } from "./Order.model";
import { IOrder } from "./Order.interface";

/* =================================
   Create Order
================================= */
const createOrder = async (payload: IOrder) => {
  const order = await Order.create(payload);

  return {
    success: true,
    message: "Order created successfully",
    data: order,
  };
};

/* =================================
   Get All Orders
================================= */
const getOrders = async () => {
  const orders = await Order.find().sort({ createdAt: -1 });

  return {
    success: true,
    data: orders,
  };
};

/* =================================
   Get User Orders (by sessionId)
================================= */
const getUserOrders = async (sessionId: string) => {
  const orders = await Order.find({ sessionId }).sort({
    createdAt: -1,
  });

  return {
    success: true,
    data: orders,
  };
};

/* =================================
   Get Order By ID
================================= */
const getOrderById = async (orderId: string) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  return {
    success: true,
    data: order,
  };
};

/* =================================
   Update Order Status
================================= */
const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  const updateData: any = { orderStatus: status };

  if (status === "delivered") {
    updateData.deliveredAt = new Date();
  }

  if (status === "cancelled") {
    updateData.cancelledAt = new Date();
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    updateData,
    { new: true }
  );

  if (!updatedOrder) {
    throw new Error("Order not found");
  }

  return {
    success: true,
    message: "Order status updated",
    data: updatedOrder,
  };
};

/* =================================
   Delete Order
================================= */
const deleteOrder = async (orderId: string) => {
  const deleted = await Order.findByIdAndDelete(orderId);

  if (!deleted) {
    throw new Error("Order not found");
  }

  return {
    success: true,
    message: "Order deleted successfully",
  };
};

export const orderService = {
  createOrder,
  getOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
