import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FeeDomainEntityBase } from '../../../../../../domain/entities/invoice';

@Entity('Fees')
export class FeeMySqlEntity extends FeeDomainEntityBase {
  @PrimaryGeneratedColumn('uuid')
  feeId: string;

  @Column({ nullable: true })
  tax: number;

  @Column({ nullable: true })
  charge: number;

  @Column({ type: 'bigint', nullable: true })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt: number;

  @Column({ type: 'bigint', nullable: true })
  deletedAt: number;
}
