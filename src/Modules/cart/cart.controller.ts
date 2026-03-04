import { Request, Response } from 'express';
import { CartService } from './cart.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const getCart = catchAsync(async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  
  if (!sessionId) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Session ID is required',
      data: null,
    });
  }
  
  const result = await CartService.getCartBySessionId(sessionId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart fetched successfully',
    data: result,
  });
});

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const { sessionId, productId, quantity } = req.body;
  
  if (!sessionId || !productId || !quantity) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Session ID, Product ID and quantity are required',
      data: null,
    });
  }
  
  const result = await CartService.addToCart(sessionId, productId, quantity);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Item added to cart successfully',
    data: result,
  });
});

const updateCartItem = catchAsync(async (req: Request, res: Response) => {
  const { sessionId, productId, quantity } = req.body;
  
  if (!sessionId || !productId || quantity === undefined) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Session ID, Product ID and quantity are required',
      data: null,
    });
  }
  
  const result = await CartService.updateCartItem(sessionId, productId, quantity);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart updated successfully',
    data: result,
  });
});

const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  const { productId } = req.params;
  
  if (!sessionId) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Session ID is required',
      data: null,
    });
  }
  
  const result = await CartService.removeFromCart(sessionId, productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Item removed from cart successfully',
    data: result,
  });
});

const clearCart = catchAsync(async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  
  if (!sessionId) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Session ID is required',
      data: null,
    });
  }
  
  const result = await CartService.clearCart(sessionId);

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