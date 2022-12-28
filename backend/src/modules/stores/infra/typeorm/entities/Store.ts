import User from '../../../../users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ContractType from './ContractType';
import Status from './Status';
import MenuSection from '../../../../products/infra/typeorm/entities/MenuSection';

@Entity({ name: 'store' })
export default class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name_code: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  phone_number: string;

  @Column({ type: 'text' })
  url_profile_image: string;

  @Column({ type: 'text' })
  url_banner_image: string;

  @Column({ type: 'datetime' })
  open_hour: Date;

  @Column({ type: 'datetime' })
  close_hour: Date;

  @Column({ type: 'datetime', nullable: true })
  start_active_at: Date;

  @Column({ type: 'int' })
  status_id: number;

  @Column({ type: 'int' })
  id_admin: number;

  @Column({ type: 'int' })
  contract_type_id: number;

  @OneToMany(() => MenuSection, (menu_section) => menu_section.store, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  menuSections: MenuSection[];

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id', foreignKeyConstraintName: 'fk_status_id' })
  status: Status;

  @ManyToOne(() => ContractType)
  @JoinColumn({
    name: 'contract_type_id',
    foreignKeyConstraintName: 'fk_contract_type_id',
  })
  contract_type: ContractType;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_admin' })
  admin: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
