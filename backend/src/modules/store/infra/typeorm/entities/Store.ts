import User from '../../../../user/infra/typeorm/entities/User';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ContractType from './ContractType';
import Status from './Status';

@Entity()
export default class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

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

  @OneToOne(() => Status)
  @JoinColumn({ name: 'id_status', referencedColumnName: 'id' })
  status: Status;

  @OneToOne(() => ContractType)
  @JoinColumn({ name: 'id_contract_type', referencedColumnName: 'id' })
  contract_type: ContractType;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_admin', referencedColumnName: 'id' })
  admin: User;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime' })
  updated_at: Date;
}
