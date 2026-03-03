import express from 'express';
import { productControlers } from './Product.controler';
import auth from '../../app/middleware/auth.middleware';


const Router = express.Router();

// Public routes
Router.get('/products', productControlers.searchProductByQuery);//ok
Router.get('/products/filter', productControlers.filterProducts);//ok
Router.get('/products/:productId', productControlers.getSingleProduct);//ok

// Admin only routes
Router.post('/products',  productControlers.CreateProduct);//ok
Router.put('/products/:productId',  productControlers.updateAsingleprodcut);//ok
Router.delete('/products/:productId',  productControlers.deleteAsingleprodcut);//ok

export const ProductRout = Router;