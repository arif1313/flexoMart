export type TFavourite = {
  userId: string;
  products: string[]; // Array of product IDs
  createdAt?: Date;
  updatedAt?: Date;
};