import express from 'express';
import { productControlers } from './Product.controler';
import { orderControls } from '../Modules/OrderManage/Order.controles';
const Router = express.Router();

Router.post('/products', productControlers.CreateProduct);
// Router.get('/products', productControlers.getProduct);
Router.get('/products/:productId', productControlers.getSingleProduct);
Router.put('/products/:productId', productControlers.updateAsingleprodcut);
Router.delete('/products/:productId', productControlers.deleteAsingleprodcut);
Router.get('/products', productControlers.searchProductByQuery);

Router.post('/orders', orderControls.CreateOrder);
Router.get('/orders', orderControls.searchOrderByQuery);
export const ProductRout = Router;
