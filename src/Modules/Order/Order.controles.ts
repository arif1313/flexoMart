import { Request, Response } from "express";
import catchAsync from "../../app/utils/catchAsync";

import { orderService } from "./Order.service";
import sendResponse from "../../app/utils/sendResponse";
import { orderProductSchema, updateOrderStatusSchema } from "./Order.validation";


const CreateOrder = catchAsync(async (req: Request, res: Response) => {
  const zodParseData = orderProductSchema.parse(req.body);
  const result = await orderService.createOrderDblink(zodParseData);

  sendResponse(res, {
    statusCode: result.success ? 201 : 400,
    success: result.success,
    message: result.message,
    data: result || null,
  });
});



const searchOrderByQuery = catchAsync(async (req: Request, res: Response) => {
  const email = req.query.email as string | undefined;
  const result = await orderService.getOrdersDblink(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: email ? 'Orders fetched for user email!' : 'Orders fetched successfully!',
    data: result,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getOrderById(req.params.orderId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = updateOrderStatusSchema.parse(req.body);
  const result = await orderService.updateOrderStatus(
    req.params.orderId,
    status,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order status updated successfully',
    data: result,
  });
});

const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const email = req.query.email as string | undefined;
  
  if (!email) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Email is required to fetch user orders',
      data: null,
    });
  }
  
  const result = await orderService.getUserOrders(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User orders fetched successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.deleteOrder(req.params.orderId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  });
});

export const orderControls = {
  CreateOrder,
  searchOrderByQuery,
  getOrderById,
  updateOrderStatus,
  getUserOrders,
  deleteOrder,
};