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
    required: [true, ' Name is required'],

    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  description: {
    type: String,
    required: [true, 'must enter podcuct information'],
    minlength: [30, 'description should more than 20 char'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  category: {
    type: String,
    required: [true, ' Catagory is required'],
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [TVariantSchema],
    required: true,
  },
  inventory: TInventorySchema,
});

export const ProductModel = model<TProduct>('FlexoProducts', TProductSchema);
