import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  id_admin: number;
}

@injectable()
export default class DeleteStoreService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ id_admin }: IRequest): Promise<void> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError('Only authenticated users can delete store.', 401);
    }

    if (store.url_banner_image) {
      await this.storageProvider.deleteFile(store.url_banner_image);
    }

    if (store.url_profile_image) {
      await this.storageProvider.deleteFile(store.url_profile_image);
    }

    //TODO apagar todos os produtos
    //TODO apagar todos os menus criados

    await this.storesRepository.delete(store.id);
  }
}
