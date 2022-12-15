import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: string;
}
