import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import config from './config';
import { globalErrorHandler, notFoundHandler } from './middlewares/errorHandler';
import mainRouter from './routes';

const app: Application = express();

const allowedOrigins = [
  config.frontend_url,
  'http://localhost:3000',
  'http://localhost:3001',
  'https://kahf-treasure.vercel.app',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) ||
      /^http:\/\/localhost:\d+$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse httpOnly auth cookies
app.use('/uploads', express.static(path.join(process.cwd(), config.upload_dir)));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Welcome to KAHF Treasure API!' });
});

app.use('/api/v1', mainRouter);

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
