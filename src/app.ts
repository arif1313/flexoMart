// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import { ProductRout } from './Modules/Product/Product.routes';

// export const app: Application = express();

// app.use(express.json());

// app.use(
  // cors({
  //   origin: "http://localhost:5173",
  //   credentials: true,
  // })
// );
// app.use('/api', ProductRout);
// app.get('/', (req: Request, res: Response) => {
//   res.send({ message: 'hello   this is my ecomarce server ' });
// });

// app.use((req: Request, res: Response) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ProductRout } from './Modules/Product/Product.routes';
import { UserRoutes } from './Modules/user/user.router';
import { OrderRoutes } from './Modules/Order/order.router';
import { CartRoutes } from './Modules/cart/cart.router';
import { FavouriteRoutes } from './Modules/favourite/favourite.router';


const app: Application = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
app.use(express.json());

// Routes
app.use('/api', ProductRout);
app.use('/api', UserRoutes);
app.use('/api', OrderRoutes);
app.use('/api', CartRoutes);
app.use('/api', FavouriteRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Not found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error : {},
  });
});

export default app;