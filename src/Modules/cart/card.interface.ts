export type TCartItem = {
  productId: string;
  quantity: number;
  price: number;
  name?: string;
  image?: string;
};

export type TCart = {
  sessionId: string; // Changed from userId to sessionId
  items: TCartItem[];
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
};