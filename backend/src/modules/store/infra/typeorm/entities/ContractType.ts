import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ContractType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'float' })
  value: number;
}
