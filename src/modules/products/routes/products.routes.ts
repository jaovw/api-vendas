import { Router } from 'express';
import ProductController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
const productRouter = Router();
const poroductsController = new ProductController();

productRouter.get('/', poroductsController.index);

//  APLICANDO VALIDACAO DE REQUISICAO BODY/PARAM UTILIZANDO O CELEBRATE
productRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  poroductsController.show,
);

productRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  poroductsController.create,
);

productRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  poroductsController.update,
);

productRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  poroductsController.delete,
);

export default productRouter;
