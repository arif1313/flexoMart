import { Request, Response } from 'express';
import { CartService } from './cart.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';


const getCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  
  if (!userId) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'User ID is required',
      data: null,
    });
  }
  
  const result = await CartService.getCartByUserId(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart fetched successfully',
    data: result,
  });
});

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  
  if (!userId || !productId || !quantity) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'User ID, Product ID and quantity are required',
      data: null,
    });
  }
  
  const result = await CartService.addToCart(userId, productId, quantity);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Item added to cart successfully',
    data: result,
  });
});

const updateCartItem = catchAsync(async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  
  if (!userId || !productId || quantity === undefined) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'User ID, Product ID and quantity are required',
      data: null,
    });
  }
  
  const result = await CartService.updateCartItem(userId, productId, quantity);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart updated successfully',
    data: result,
  });
});

const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const { productId } = req.params;
  
  if (!userId) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'User ID is required',
      data: null,
    });
  }
  
  const result = await CartService.removeFromCart(userId, productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Item removed from cart successfully',
    data: result,
  });
});

const clearCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  
  if (!userId) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'User ID is required',
      data: null,
    });
  }
  
  const result = await CartService.clearCart(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart cleared successfully',
    data: result,
  });
});

export const CartController = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};