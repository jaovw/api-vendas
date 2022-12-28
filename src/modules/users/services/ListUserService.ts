import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const userRespository = getCustomRepository(UsersRepository);

    const users = await userRespository.find();

    return users;
  }
}
