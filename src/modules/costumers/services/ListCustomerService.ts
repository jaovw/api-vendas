import { getCustomRepository } from 'typeorm';
import Costumer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

export default class ListCustomerService {
  public async execute(): Promise<Costumer[]> {
    const customersRespository = getCustomRepository(CustomersRepository);

    const customers = customersRespository.find();

    return customers;
  }
}
