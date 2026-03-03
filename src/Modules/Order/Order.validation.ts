import { z } from 'zod';

// Shipping address schema
const shippingAddressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
});

// Main order schema
export const orderProductSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  productId: z.string().min(1, 'Product ID is required'),
  price: z.number().nonnegative('Price must be positive'),
  quantity: z.number().int().positive('Quantity must be at least 1'),
  status: z.enum(['pending', 'shipping', 'delivered', 'cancelled']).default('pending'),
  paymentMethod: z.enum(['cash', 'card']),
  shippingAddress: shippingAddressSchema,
  userId: z.string().optional(),
});

// Schema for updating only the status
export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'shipping', 'delivered', 'cancelled']),
});
