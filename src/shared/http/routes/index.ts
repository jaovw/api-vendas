import productRouter from '@modules/products/routes/products.routes';
import { Request, Response, Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);

export default routes;
