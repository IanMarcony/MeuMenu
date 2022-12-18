import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Store from '../../../../stores/infra/typeorm/entities/Store';
import Product from './Product';

@Entity({ name: 'menu_section' })
export default class MenuSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  id_store: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'id_store' })
  store: Store;

  @OneToMany(() => Product, (product) => product.menu_section, {
    onDelete: 'CASCADE',
  })
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
