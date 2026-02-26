import { Schema, model } from 'mongoose';

import { TorderProduct } from './Order.interface';

const orderProductSchema = new Schema<TorderProduct>({
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
});

export const OrderProductModel = model<TorderProduct>(
  'FlexoOrder',
  orderProductSchema,
);
