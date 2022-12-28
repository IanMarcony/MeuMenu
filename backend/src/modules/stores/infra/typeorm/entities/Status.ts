import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'status' })
export default class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: string;
}
