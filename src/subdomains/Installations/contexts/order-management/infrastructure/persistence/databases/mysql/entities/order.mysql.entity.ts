import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderDomainEntityBase } from '../../../../../domain/entities';
import {
  BenefitedMySqlEntity,
  EmployedMySqlEntity,
  KitMySqlEntity,
} from './';

@Entity()
export class OrderMySqlEntity extends OrderDomainEntityBase {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @Column({ nullable: true })
  status: boolean;

  @OneToOne(() => KitMySqlEntity, entity => entity.kitId, { cascade: true })
  @JoinColumn({ name: 'kitId' })
  kit: KitMySqlEntity;

  @OneToOne(() => EmployedMySqlEntity, entity => entity.employedId, { cascade: true })
  @JoinColumn({ name: 'employedId' })
  employed: EmployedMySqlEntity;

  @OneToOne(() => BenefitedMySqlEntity, entity => entity.benefitedId, { cascade: true })
  @JoinColumn({ name: 'benefitedId' })
  benefited: BenefitedMySqlEntity;

  @Column({ type: 'bigint', nullable: true })
  createdAt?: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt?: number;

  @Column({ type: 'bigint', nullable: true })
  deletedAt?: number;
}
