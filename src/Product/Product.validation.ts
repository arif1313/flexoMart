import { z } from 'zod';

const TVariantSchema = z.object({
  type: z.string({
    required_error: 'Type is required',
  }),
  value: z.string({
    required_error: 'Value is required',
  }),
});

const TInventorySchema = z.object({
  quantity: z.number({
    required_error: 'Quantity is required',
  }),
  inStock: z.boolean({
    required_error: 'InStock is required',
  }),
});

const TProductSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .trim()
    .max(20, 'Name cannot be more than 20 characters'),
  description: z
    .string({
      required_error: 'Must enter product information',
    })
    .min(30, 'Description should be more than 30 characters'),
  price: z.number({
    required_error: 'Price is required',
  }),
  category: z.string({
    required_error: 'Category is required',
  }),
  tags: z.array(z.string(), {
    required_error: 'Tags are required',
  }),
  variants: z.array(TVariantSchema, {
    required_error: 'Variants are required',
  }),
  inventory: TInventorySchema,
});

export { TProductSchema, TVariantSchema, TInventorySchema };
