import { Request, Response } from 'express';
import { productService } from './Product.service';

import { TProductSchema } from './Product.validation';
const CreateProduct = async (req: Request, res: Response) => {
  try {
    //zod validatin

    const product = req.body;
    const zodParseData = TProductSchema.parse(product);

    const result = await productService.createproductDbLInk(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'somethign worng',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = req.params;
    const result = await productService.GetAsingleProductFromDB(
      product.productId,
    );
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something error !',
      err: err,
    });
  }
};
const updateAsingleprodcut = async (req: Request, res: Response) => {
  try {
    const product = req.params;
    const updatData = req.body;
    const result = await productService.updateAsingleProductFromDB(
      product.productId,
      updatData,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something error !',
      err: err,
    });
  }
};
const deleteAsingleprodcut = async (req: Request, res: Response) => {
  try {
    const product = req.params;
    const result = await productService.DeleteAsingleProductFromDB(
      product.productId,
    );
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something error !',
      err: err,
    });
  }
};
const searchProductByQuery = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;

    if (!searchTerm) {
      const result = await productService.GetProductFromDB();

      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    } else {
      const result =
        await productService.SearchAsingleProductFromDB(searchTerm);

      res.status(200).json({
        success: true,
        message: "Products matching search term 'iphone' fetched successfully!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error,
    });
  }
};

export const productControlers = {
  CreateProduct,
  getSingleProduct,
  updateAsingleprodcut,
  deleteAsingleprodcut,
  searchProductByQuery,
};
