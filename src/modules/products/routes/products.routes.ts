import { Router } from 'express';
import ProductController from '../controllers/ProductsController';

const productRouter = Router();
const poroductsController = new ProductController();

productRouter.get('/', poroductsController.index);
productRouter.get('/:id', poroductsController.show);
productRouter.post('/', poroductsController.create);
productRouter.put('/:id', poroductsController.update);
productRouter.delete('/:id', poroductsController.delete);

export default productRouter;
