import { Schema, model } from 'mongoose';
import { TOrderProduct } from './Order.interface';

const orderProductSchema = new Schema<TOrderProduct>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    productId: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be positive'],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    status: {
      type: String,
      enum: ['pending', 'shipping', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card'],
      required: true,
    },
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    userId: {
      type: String,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const OrderProductModel = model<TOrderProduct>(
  'FlexoOrder',
  orderProductSchema,
);