import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('O token para esse usuario nao existe.');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuario nao existe.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    user.password = await hash(password, 8);
  }
}
