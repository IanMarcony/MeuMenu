import Store from '../../../../store/infra/typeorm/entities/Store';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class MenuSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'id_store' })
  store: Store;
}
