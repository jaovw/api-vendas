import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file!.originalname, //  ! PARA RETIRAR O ERRO DE UNDEFINED
    });

    return response.json({ message: 'Sucesso!', content: user });
  }
}
