export type TOrderStatus = 'pending' | 'shipping' | 'delivered' | 'cancelled';

export type TShippingAddress = {
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
};

export type TOrderProduct = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
  status: TOrderStatus;
  paymentMethod: 'cash' | 'card';
  shippingAddress: TShippingAddress;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};