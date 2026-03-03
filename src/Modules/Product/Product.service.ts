import { ProductModel } from './Product.model';
import { TProduct } from './Product.interface';

const createproductDbLInk = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const GetProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const GetAsingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

const updateAsingleProductFromDB = async (id: string, data: object) => {
  const result = await ProductModel.findByIdAndUpdate(
    id,
    data,
    {
      new: true,        // return updated document
      runValidators: true,
    }
  );
  return result;
};


const DeleteAsingleProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

// Enhanced search with category filtering
const SearchAsingleProductFromDB = async (searchTerm: string) => {
  const query = { name: { $regex: searchTerm, $options: 'i' } };
  const result = await ProductModel.find(query);
  return result;
};

// Advanced search: first by category, then by name within category
const advancedSearchProducts = async (searchTerm: string) => {
  // First search by category
  const categoryResults = await ProductModel.find({
    category: { $regex: searchTerm, $options: 'i' }
  });

  // Then search by name within those categories
  const categoryNames = categoryResults.map(p => p.category);
  const nameResults = await ProductModel.find({
    category: { $in: categoryNames },
    name: { $regex: searchTerm, $options: 'i' }
  });

  // Combine results (remove duplicates)
  const combinedResults = [...categoryResults];
  nameResults.forEach(item => {
    if (!combinedResults.some(r => r._id.toString() === item._id.toString())) {
      combinedResults.push(item);
    }
  });

  return combinedResults;
};

// Filter products
const filterProducts = async (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  inStock?: boolean;
}) => {
  const query: any = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = filters.minPrice;
    if (filters.maxPrice) query.price.$lte = filters.maxPrice;
  }

  if (filters.tags && filters.tags.length > 0) {
    query.tags = { $in: filters.tags };
  }

  if (filters.inStock !== undefined) {
    query['inventory.inStock'] = filters.inStock;
  }

  const result = await ProductModel.find(query);
  return result;
};

export const productService = {
  createproductDbLInk,
  GetProductFromDB,
  GetAsingleProductFromDB,
  updateAsingleProductFromDB,
  DeleteAsingleProductFromDB,
  SearchAsingleProductFromDB,
  advancedSearchProducts,
  filterProducts,
};