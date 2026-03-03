export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TLoginUser = {
  email: string;
  password: string;
};