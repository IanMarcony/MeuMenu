import Status from '../infra/typeorm/entities/Status';

export default interface IStatusRepository {
  findById(id: number): Promise<Status | null>;
  findByType(type: string): Promise<Status | null>;
}
