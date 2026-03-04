import { Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  city: string;
  address: string;
}

export interface IOrder {
  sessionId: string;
  orderNumber: string;
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}