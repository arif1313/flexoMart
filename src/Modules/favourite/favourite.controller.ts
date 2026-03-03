import { Request, Response } from 'express';
import { FavouriteService } from './favourite.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';


const getFavourite = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  
  if (!userId) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'User ID is required',
      data: null,
    });
  }
  
  const result = await FavouriteService.getFavouriteProducts(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Favourite list fetched successfully',
    data: result,
  });
});

const addToFavourite = catchAsync(async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  
  if (!userId || !productId) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'User ID and Product ID are required',
      data: null,
    });
  }
  
  const result = await FavouriteService.addToFavourite(userId, productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product added to favourites successfully',
    data: result,
  });
});

const removeFromFavourite = catchAsync(async (req: Request, res: Response) => {
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
  
  const result = await FavouriteService.removeFromFavourite(userId, productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product removed from favourites successfully',
    data: result,
  });
});

export const FavouriteController = {
  getFavourite,
  addToFavourite,
  removeFromFavourite,
};