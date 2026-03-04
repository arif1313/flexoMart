import { CartModel } from './cart.model';
import { productService } from '../Product/Product.service';
import { TCartItem } from './card.interface';

const getCartBySessionId = async (sessionId: string) => {
  let cart = await CartModel.findOne({ sessionId });
  if (!cart) {
    cart = await CartModel.create({
      sessionId,
      items: [],
      totalAmount: 0,
    });
  }
  return cart;
};

const addToCart = async (sessionId: string, productId: string, quantity: number) => {
  const product = await productService.GetAsingleProductFromDB(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.inventory.quantity < quantity) {
    throw new Error('Insufficient stock');
  }

  let cart = await CartModel.findOne({ sessionId });
  if (!cart) {
    cart = new CartModel({
      sessionId,
      items: [],
      totalAmount: 0,
    });
  }

  const existingItemIndex = cart.items.findIndex(
    (item: TCartItem) => item.productId === productId
  );

  if (existingItemIndex > -1) {
    // Update existing item
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({
      productId,
      quantity,
      price: product.price,
      name: product.name,
      image: product.image,
    });
  }

  // Calculate total
  cart.totalAmount = cart.items.reduce(
    (total: number, item: TCartItem) => total + item.price * item.quantity,
    0
  );

  await cart.save();
  return cart;
};

const updateCartItem = async (sessionId: string, productId: string, quantity: number) => {
  const cart = await CartModel.findOne({ sessionId });
  if (!cart) {
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(
    (item: TCartItem) => item.productId === productId
  );
  
  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    cart.items.splice(itemIndex, 1);
  } else {
    // Check stock availability
    const product = await productService.GetAsingleProductFromDB(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    if (product.inventory.quantity < quantity) {
      throw new Error('Insufficient stock');
    }
    
    // Update quantity
    cart.items[itemIndex].quantity = quantity;
  }

  // Recalculate total
  cart.totalAmount = cart.items.reduce(
    (total: number, item: TCartItem) => total + item.price * item.quantity,
    0
  );

  await cart.save();
  return cart;
};

const removeFromCart = async (sessionId: string, productId: string) => {
  const cart = await CartModel.findOne({ sessionId });
  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter((item: TCartItem) => item.productId !== productId);
  
  // Recalculate total
  cart.totalAmount = cart.items.reduce(
    (total: number, item: TCartItem) => total + item.price * item.quantity,
    0
  );

  await cart.save();
  return cart;
};

const clearCart = async (sessionId: string) => {
  const cart = await CartModel.findOne({ sessionId });
  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();
  return cart;
};

export const CartService = {
  getCartBySessionId,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};