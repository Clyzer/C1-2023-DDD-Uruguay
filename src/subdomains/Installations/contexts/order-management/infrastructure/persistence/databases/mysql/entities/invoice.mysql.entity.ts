import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { InvoiceDomainEntityBase } from '../../../../../domain/entities';
import {
  CompanyMySqlEntity,
  FeeMySqlEntity,
} from './';

@Entity('Invoices')
export class InvoiceMySqlEntity extends InvoiceDomainEntityBase {
  @PrimaryGeneratedColumn('uuid')
  invoiceId: string;

  @Column({ nullable: true })
  status: boolean;

  @OneToOne(() => CompanyMySqlEntity, entity => entity.companyId, { cascade: true })
  @JoinColumn({ name: 'companyId' })
  company: CompanyMySqlEntity;

  @OneToOne(() => FeeMySqlEntity, entity => entity.feeId, { cascade: true })
  @JoinColumn({ name: 'feeId' })
  fee: FeeMySqlEntity;

  @Column({ type: 'bigint', nullable: true })
  createdAt?: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt?: number;

  @Column({ type: 'bigint', nullable: true })
  deletedAt?: number;
}
