import IContractTypesRepository from '@modules/stores/repositories/IContractTypesRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import ContractType from '../entities/ContractType';

export default class ContractTypeRepository
  implements IContractTypesRepository
{
  private ormRepository: Repository<ContractType>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(ContractType);
  }

  public async findById(id: number): Promise<ContractType | null> {
    const contractType = await this.ormRepository.findOne({ where: { id } });
    return contractType;
  }
  public async findByType(type: string): Promise<ContractType | null> {
    const contractType = await this.ormRepository.findOne({ where: { type } });
    return contractType;
  }
}
