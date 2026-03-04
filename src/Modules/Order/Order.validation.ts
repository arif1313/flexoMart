import { z } from "zod";

/* ================================
   Order Item Validation
================================ */
export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be positive"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  image: z.string().optional(),
});

/* ================================
   Shipping Address Validation
================================ */
export const shippingAddressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(5, "Phone is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
});

/* ================================
   Create Order Validation
================================ */
export const createOrderSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
  orderNumber: z.string().min(1, "Order number is required"),
  items: z.array(orderItemSchema).min(1, "At least one item required"),
  totalAmount: z.number().min(0),
  shippingAddress: shippingAddressSchema,
  paymentMethod: z.string().min(1, "Payment method is required"),
  notes: z.string().optional(),
});

/* ================================
   Update Order Status Validation
================================ */
export const updateOrderStatusSchema = z.object({
  orderStatus: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
});
