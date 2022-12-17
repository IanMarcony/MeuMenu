import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  filename_profile_image: string;
  filename_banner_image: string;
  id_admin: number;
}

@injectable()
export default class UpdateProfileAndBannerStoreService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    filename_banner_image,
    filename_profile_image,
    id_admin,
  }: IRequest): Promise<Store> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (store.url_banner_image) {
      await this.storageProvider.deleteFile(store.url_banner_image);
    }

    if (store.url_profile_image) {
      await this.storageProvider.deleteFile(store.url_profile_image);
    }

    const profile_image_filename = await this.storageProvider.saveFile(
      filename_profile_image,
    );
    const banner_image_filename = await this.storageProvider.saveFile(
      filename_banner_image,
    );

    store.url_banner_image = banner_image_filename;
    store.url_profile_image = profile_image_filename;

    await this.storesRepository.update(store);

    return store;
  }
}
