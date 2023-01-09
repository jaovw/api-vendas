import CustomersRepository from '@modules/costumers/typeorm/repositories/CustomersRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError(
        'Nao foi possivel achar um customer com o id informado.',
      );
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    //  EXCESSAO PARA PRODUTOS NAO ENCONTRADOS
    if (!existsProducts.length) {
      throw new AppError(
        'Nao foi possivel achar os produtos com os ids informados.',
      );
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    //  PRODUTOS NAO ENCONTRADOS
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Nao foi possivel achar os produtos ${checkInexistentProducts[0].id}`,
      );
    }

    const quantityAvaliable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvaliable.length) {
      throw new AppError(
        `A quantidade ${quantityAvaliable[0].quantity} nao esta disponivel para ${quantityAvaliable[0].id}`,
      );
    }

    //  MONTANDO O OBJETO COM AS INFORMACOES NECESSARIAS
    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
