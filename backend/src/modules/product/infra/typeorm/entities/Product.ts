import Store from '../../../../store/infra/typeorm/entities/Store';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import MenuSection from './MenuSection';
@Entity()
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
  url_image_product: string;

  @ManyToOne(() => MenuSection)
  @JoinColumn({ name: 'id_menu_section' })
  menu_section: MenuSection;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'id_store' })
  store: Store;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime' })
  updated_at: Date;
}
