import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { OrderDomainEntityBase } from '../../../../../domain/entities';
import { BenefitedMySqlEntity, EmployedMySqlEntity, KitMySqlEntity } from './';

@Entity()
export class OrderMySqlEntity extends OrderDomainEntityBase {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @Column({ nullable: true })
  status: boolean;

  @OneToOne(() => KitMySqlEntity, (entity) => entity)
  kit: KitMySqlEntity;

  @OneToOne(() => EmployedMySqlEntity, (entity) => entity)
  employed: EmployedMySqlEntity;

  @OneToOne(() => BenefitedMySqlEntity, (entity) => entity)
  benefited: BenefitedMySqlEntity;

  @Column({ type: 'bigint', nullable: true })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt?: number;

  @Column({ type: 'bigint', nullable: true })
  deletedAt?: number;
}
