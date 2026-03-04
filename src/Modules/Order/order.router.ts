import express from "express";
import { orderController } from "./Order.controles";


const router = express.Router();

// Create a new order
router.post("/orders", orderController.createOrder);

// Get all orders for a session
router.get("/orders", orderController.getOrders);

// Get user orders (alternative endpoint)
router.get("/orders/user", orderController.getUserOrders);

// Get single order by ID
router.get("/orders/:orderId", orderController.getOrderById);

// Update order status
router.patch("/orders/:orderId/status", orderController.updateOrderStatus);

// Delete order
router.delete("/orders/:orderId", orderController.deleteOrder);

export const OrderRoutes = router;