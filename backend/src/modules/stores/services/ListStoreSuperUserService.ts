import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  id_admin: number;
}

@injectable()
export default class ListStoreSuperUserService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id_admin }: IRequest): Promise<Store[]> {
    const user = await this.usersRepository.findById(id_admin);

    if (user && !user.is_super_user) {
      throw new AppError('Action Blocked');
    }

    const store = await this.storesRepository.findAll();

    return store;
  }
}
