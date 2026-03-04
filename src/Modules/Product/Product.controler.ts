import { Request, Response } from 'express';
import { productService } from './Product.service';
import { TProductSchema } from './Product.validation';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';


const CreateProduct = catchAsync(async (req: Request, res: Response) => {

   const product = {
      ...req.body,
      image: req.body.image, // single string
    };
  const zodParseData = TProductSchema.parse(product);
  const result = await productService.createproductDbLInk(zodParseData);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product created successfully!',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.GetAsingleProductFromDB(req.params.productId);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product fetched successfully!',
    data: result,
  });
});

const updateAsingleprodcut = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.updateAsingleProductFromDB(
    req.params.productId,
    req.body,
  );
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteAsingleprodcut = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.DeleteAsingleProductFromDB(req.params.productId);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successfully!',
    data: result,
  });
});

const searchProductByQuery = catchAsync(async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string | undefined;
  const advanced = req.query.advanced === 'true';

  if (!searchTerm) {
    const result = await productService.GetProductFromDB();
    
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } else {
    let result;
    if (advanced) {
      result = await productService.advancedSearchProducts(searchTerm);
    } else {
      result = await productService.SearchAsingleProductFromDB(searchTerm);
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Products matching search term fetched successfully!",
      data: result,
    });
  }
});

const filterProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    category: req.query.category as string,
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
    inStock: req.query.inStock === 'true' ? true : 
             req.query.inStock === 'false' ? false : undefined,
  };

  const result = await productService.filterProducts(filters);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products filtered successfully!',
    data: result,
  });
});

export const productControlers = {
  CreateProduct,
  getSingleProduct,
  updateAsingleprodcut,
  deleteAsingleprodcut,
  searchProductByQuery,
  filterProducts,
};