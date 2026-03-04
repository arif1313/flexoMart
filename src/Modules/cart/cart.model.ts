import { Schema, model } from 'mongoose';
import { TCart, TCartItem } from './card.interface';

const cartItemSchema = new Schema<TCartItem>({
  productId: {
    type: String,
    required: true,
    ref: 'FlexoProducts',
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
});

const cartSchema = new Schema<TCart>(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    items: [cartItemSchema],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const CartModel = model<TCart>('Cart', cartSchema);