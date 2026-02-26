import { z } from 'zod';

export const TorderProductSchema = z.object({
  email: z.string().email('Please fill a valid email address'),
  productId: z.string(),
  price: z.number().nonnegative('Price must be positive'),
  quantity: z.number().int().positive('Quantity must be at least 1'),
});
