import AppError from '@shared/errors/AppError';
import Constants from '@shared/utils/Constants';
import { inject, injectable } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStatusRepository from '../repositories/IStatusRepository';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
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
  ) {}

  async execute({ status, id_admin }: IRequest): Promise<Store> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError(
        'Only authenticated users can change information.',
        401,
      );
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
