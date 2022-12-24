import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import Constants from '@shared/utils/Constants';
import { inject, injectable } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStatusRepository from '../repositories/IStatusRepository';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  id_store: number;
  status: string;
  id_admin: number;
}

@injectable()
export default class UpdateStatusStoreService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id_store, status, id_admin }: IRequest): Promise<Store> {
    const user = await this.usersRepository.findById(id_admin);

    if (user && !user.is_super_user) {
      throw new AppError('Action blocked');
    }

    const store = await this.storesRepository.findById(id_store);

    if (!store) {
      throw new AppError('Store cannot be found', 404);
    }

    const statusDB = await this.statusRepository.findByType(
      status === Constants.StatusType.ACTIVE
        ? Constants.StatusType.ACTIVE
        : status === Constants.StatusType.DEACTIVE
        ? Constants.StatusType.DEACTIVE
        : Constants.StatusType.PEDING_PAYMENT,
    );

    store.status_id = statusDB.id;

    if (status === Constants.StatusType.ACTIVE && !store.start_active_at) {
      store.start_active_at = new Date();
    }

    await this.storesRepository.update(store);

    return store;
  }
}
