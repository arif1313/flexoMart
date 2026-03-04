import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './Product.interface';

const TVariantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const TInventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const TProductSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  description: {
    type: String,
    required: [true, 'Must enter product information'],
    minlength: [30, 'Description should be more than 30 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [TVariantSchema],
    required: true,
  },
  inventory: {
    type: TInventorySchema,
    required: true,
  },
  image: {
    type: String,
    required: [true, 'Image is required'], // Optional: add if image is required
  }
}); // <-- This closing bracket was missing!

export const ProductModel = model<TProduct>('FlexoProducts', TProductSchema);