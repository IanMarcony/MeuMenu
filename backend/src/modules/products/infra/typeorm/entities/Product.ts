import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Store from '../../../../stores/infra/typeorm/entities/Store';
import MenuSection from './MenuSection';
@Entity({ name: 'products' })
export default class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text' })
  image_product_filename: string;

  @Column({ type: 'int' })
  id_menu_section: number;

  @Column({ type: 'int' })
  id_store: number;

  @ManyToOne(() => MenuSection, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_menu_section' })
  menu_section: MenuSection;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'id_store' })
  store: Store;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
