import express from 'express';
import { CartController } from './cart.controller';

const router = express.Router();

// All routes are public (no authentication required)
router.get('/cart', CartController.getCart);
router.post('/cart/add', CartController.addToCart);
router.put('/cart/update', CartController.updateCartItem);
router.delete('/cart/item/:productId', CartController.removeFromCart);
router.delete('/cart/clear', CartController.clearCart);

export const CartRoutes = router;