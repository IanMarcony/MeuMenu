import AppError from '@shared/errors/AppError';
import Constants from '@shared/utils/Constants';
import { inject, injectable } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IContractTypesRepository from '../repositories/IContractTypesRepository';
import IStatusRepository from '../repositories/IStatusRepository';
import IStoresRepository from '../repositories/IStoresRepository';

interface IRequest {
  description: string;
  phone_number: string;
  contract_type: string;
  open_hour: Date;
  close_hour: Date;
  id_admin: number;
}

@injectable()
export default class UpdateStoreService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('ContractTypeRepository')
    private contractTypesRepository: IContractTypesRepository,
  ) {}

  async execute({
    description,
    phone_number,
    open_hour,
    close_hour,
    id_admin,
    contract_type,
  }: IRequest): Promise<Store> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError(
        'Only authenticated users can change information.',
        401,
      );
    }

    const contractType = await this.contractTypesRepository.findByType(
      contract_type === Constants.ContractType.MONTHLY
        ? Constants.ContractType.MONTHLY
        : Constants.ContractType.THREE_MONTHLY,
    );

    store.id_contract_type = contractType?.id || 1;
    store.description = description;
    store.phone_number = phone_number;
    store.open_hour = new Date(open_hour);
    store.close_hour = new Date(close_hour);

    await this.storesRepository.update(store);

    return store;
  }
}
