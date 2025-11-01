import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';
import adminRouter from './modules/admin/routes/admin.routes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';


const app = express();
app.use(helmet()); // security middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
  

app.use('/', router);
app.use('/api/admin', adminRouter);

app.use(notFound);
app.use(errorHandler);
export default app;
