import ContractType from '../infra/typeorm/entities/ContractType';

export default interface IContractTypesRepository {
  findById(id: number): Promise<ContractType | null>;
  findByType(type: string): Promise<ContractType | null>;
}
