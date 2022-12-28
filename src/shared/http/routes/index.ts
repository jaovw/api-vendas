import productRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Request, Response, Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', usersRouter);

export default routes;
