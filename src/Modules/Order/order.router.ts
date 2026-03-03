import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';

import { orderControls } from './Order.controles';
import { orderProductSchema, updateOrderStatusSchema } from './Order.validation';


const router = express.Router();

router.post(
  '/orders',

  orderControls.CreateOrder
);//ok

router.get(
  '/orders',
  orderControls.searchOrderByQuery
);//ok

router.get(
  '/orders/user',
  orderControls.getUserOrders
);//ok

router.get(
  '/orders/:orderId',
  orderControls.getOrderById
);//ok

router.patch(
  '/orders/:orderId/status',
  validateRequest(updateOrderStatusSchema),
  orderControls.updateOrderStatus
);

router.delete(
  '/orders/:orderId',
  orderControls.deleteOrder
);//ok

export const OrderRoutes = router;