import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IContractTypesRepository from '../repositories/IContractTypesRepository';
import IStatusRepository from '../repositories/IStatusRepository';
import IStoresRepository from '../repositories/IStoresRepository';
import Constants from '@shared/utils/Constants';
import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';

interface IRequest {
  name: string;
  description: string;
  phone_number: string;
  filename_profile_image: string;
  filename_banner_image: string;
  contract_type: string;
  open_hour: Date;
  close_hour: Date;
  id_admin: number;
}

@injectable()
export default class CreateStoreService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
    @inject('ContractTypeRepository')
    private contractTypesRepository: IContractTypesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    name,
    description,
    phone_number,
    filename_banner_image,
    filename_profile_image,
    open_hour,
    close_hour,
    id_admin,
    contract_type,
  }: IRequest): Promise<Store> {
    const checkStoreExist = await this.storesRepository.findByName(name);

    if (checkStoreExist) {
      throw new AppError('Store already exists');
    }

    const status = await this.statusRepository.findByType(
      Constants.StatusType.PEDING_PAYMENT,
    );
    const contractType = await this.contractTypesRepository.findByType(
      contract_type === Constants.ContractType.MONTHLY
        ? Constants.ContractType.MONTHLY
        : Constants.ContractType.THREE_MONTHLY,
    );

    const url_banner_image = await this.storageProvider.saveFile(
      filename_banner_image,
    );
    const url_profile_image = await this.storageProvider.saveFile(
      filename_profile_image,
    );

    const store = await this.storesRepository.create({
      name,
      name_code: name.replace(' ', '-'),
      description,
      phone_number,
      url_banner_image,
      url_profile_image,
      open_hour: new Date(open_hour),
      close_hour: new Date(close_hour),
      id_admin,
      contract_type_id: contractType.id,
      status_id: status.id,
    });

    return store;
  }
}
