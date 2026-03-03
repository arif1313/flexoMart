export type TCartItem = {
  productId: string;
  quantity: number;
  price: number;
  name?: string;
};

export type TCart = {
  userId: string;
  items: TCartItem[];
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
};