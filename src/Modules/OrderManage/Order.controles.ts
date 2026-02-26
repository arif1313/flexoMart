import { Request, Response } from 'express';
import { TorderProductSchema } from './Order.validation';
import { orderService } from './Order.service';

const CreateOrder = async (req: Request, res: Response) => {
  try {
    //zod validatin

    const Order = req.body;
    const zodParseData = TorderProductSchema.parse(Order);
    const result = await orderService.createOrderDblink(zodParseData);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'somethign worng',
      error: err,
    });
  }
};

const searchOrderByQuery = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;

    if (!email) {
      const result = await orderService.getOrdersDblink();

      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    } else {
      const result = await orderService.SearchAsingleOrderFromDB(email);

      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'somthing worng',
      error: error,
    });
  }
};

// const getOrders = async (req: Request, res: Response) => {
//   try {
//     const result = await orderService.getOrdersDblink();
//     res.status(200).json({
//       success: true,
//       message: 'Orders fetched successfully!',
//       data: result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'somethign worng',
//       error: err,

//     });
//   }
// };
export const orderControls = {
  CreateOrder,

  searchOrderByQuery,
};
