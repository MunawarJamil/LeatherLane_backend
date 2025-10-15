import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api/v1', router);
app.use(notFound);
app.use(errorHandler);
export default app;