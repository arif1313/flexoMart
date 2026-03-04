import { Request, Response } from "express";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "./Order.validation";
import { orderService } from "./Order.service";


/* ================================
   Create Order
================================ */
const createOrder = async (req: Request, res: Response) => {
  try {
    const validatedData = createOrderSchema.parse(req.body);

    const result = await orderService.createOrder(validatedData as any);

    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   Get All Orders
================================ */
const getOrders = async (_req: Request, res: Response) => {
  try {
    const result = await orderService.getOrders();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================================
   Get User Orders
================================ */
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID required",
      });
    }

    const result = await orderService.getUserOrders(
      sessionId as string
    );

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================================
   Get Order By ID
================================ */
const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const result = await orderService.getOrderById(orderId);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/* ================================
   Update Order Status
================================ */
const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const validatedData = updateOrderStatusSchema.parse(req.body);

    const result = await orderService.updateOrderStatus(
      orderId,
      validatedData.orderStatus
    );

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   Delete Order
================================ */
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const result = await orderService.deleteOrder(orderId);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const orderController = {
  createOrder,
  getOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
