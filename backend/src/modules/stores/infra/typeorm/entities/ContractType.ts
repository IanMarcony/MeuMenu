import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contract_type' })
export default class ContractType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'float' })
  value: number;
}
