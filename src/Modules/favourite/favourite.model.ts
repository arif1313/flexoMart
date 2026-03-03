import { Schema, model } from 'mongoose';
import { TFavourite } from './favourite.interface';

const favouriteSchema = new Schema<TFavourite>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        type: String,
        ref: 'FlexoProducts', // Add reference to Product model for population
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const FavouriteModel = model<TFavourite>('Favourite', favouriteSchema);