import { FavouriteModel } from './favourite.model';
import { TFavourite } from './favourite.interface';
import { productService } from '../Product/Product.service';

const getFavouriteByUserId = async (userId: string) => {
  let favourite = await FavouriteModel.findOne({ userId });
  if (!favourite) {
    favourite = await FavouriteModel.create({
      userId,
      products: [],
    });
  }
  return favourite;
};

const addToFavourite = async (userId: string, productId: string) => {
  const product = await productService.GetAsingleProductFromDB(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  let favourite = await FavouriteModel.findOne({ userId });
  if (!favourite) {
    favourite = new FavouriteModel({
      userId,
      products: [],
    });
  }

  if (!favourite.products.includes(productId)) {
    favourite.products.push(productId);
    await favourite.save();
  }

  // Populate product details
  const populatedFavourite = await favourite.populate('products');
  return populatedFavourite;
};

const removeFromFavourite = async (userId: string, productId: string) => {
  const favourite = await FavouriteModel.findOne({ userId });
  if (!favourite) {
    throw new Error('Favourite list not found');
  }

  favourite.products = favourite.products.filter(id => id !== productId);
  await favourite.save();

  // Populate product details
  const populatedFavourite = await favourite.populate('products');
  return populatedFavourite;
};

const getFavouriteProducts = async (userId: string) => {
  const favourite = await FavouriteModel.findOne({ userId }).populate('products');
  if (!favourite) {
    return { products: [] };
  }
  return favourite;
};

export const FavouriteService = {
  getFavouriteByUserId,
  addToFavourite,
  removeFromFavourite,
  getFavouriteProducts,
};