import express from 'express';
import { FavouriteController } from './favourite.controller';

const router = express.Router();

// All routes are public (no authentication required)
router.get('/favourites', FavouriteController.getFavourite);
router.post('/favourites/add', FavouriteController.addToFavourite);
router.delete('/favourites/:productId', FavouriteController.removeFromFavourite);

export const FavouriteRoutes = router;