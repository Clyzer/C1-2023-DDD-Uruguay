import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  BenefitedDomainEntityBase,
} from '../../../../../../domain/entities/order';

@Entity('Benefiteds')
export class BenefitedMySqlEntity extends BenefitedDomainEntityBase {
  @PrimaryGeneratedColumn('uuid')
  benefitedId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column('uuid')
  companyId: string;

  @Column({ type: 'bigint', nullable: true })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt: number;

  @Column({ type: 'bigint', nullable: true })
  deletedAt: number;
}
