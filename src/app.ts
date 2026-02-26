import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRout } from './Product/Product.routes';
export const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use('/api', ProductRout);
app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'hello   this is my ecomarce server ' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});
