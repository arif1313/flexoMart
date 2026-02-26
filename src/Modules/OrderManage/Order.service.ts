// import { promises } from 'dns';
import { productService } from '../../Product/Product.service';
import { TorderProduct } from './Order.interface';
import { OrderProductModel } from './Order.model';

type promiss = {
  success: boolean;
  message: string;
  data?: string | object;
};

const createOrderDblink = async (order: TorderProduct): Promise<promiss> => {
  const orderContity: number = order.quantity;
  const mainProduct = await productService.GetAsingleProductFromDB(
    order.productId,
  );

  if (!mainProduct || !mainProduct.inventory) {
    return {
      success: false,
      message: 'Order not found',
    };
  }
  if (orderContity > mainProduct.inventory.quantity) {
    return {
      success: false,
      message: 'Insufficient quantity available in inventory',
    };
  }

  try {
    // Create the order

    if (orderContity === mainProduct.inventory.quantity) {
      const result = await OrderProductModel.create(order);
      mainProduct.inventory.quantity -= orderContity;
      mainProduct.inventory.inStock = false;
      await mainProduct.save();
      return {
        success: true,
        message: 'Ordered created success ',
        data: result,
      };
    } else {
      const result = await OrderProductModel.create(order);
      mainProduct.inventory.quantity -= orderContity;

      await mainProduct.save();
      return {
        success: true,
        message: 'Ordered created success ',
        data: result,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'something went worong ',
    };
  }
};

const getOrdersDblink = async () => {
  const result = await OrderProductModel.find();
  return result;
};

const SearchAsingleOrderFromDB = async (email: string) => {
  const query = { email: email };
  const result = await OrderProductModel.findOne(query);
  return result;
};
export const orderService = {
  createOrderDblink,
  getOrdersDblink,
  SearchAsingleOrderFromDB,
};
