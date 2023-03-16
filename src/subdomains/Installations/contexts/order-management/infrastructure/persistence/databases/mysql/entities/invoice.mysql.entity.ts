import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { InvoiceDomainEntityBase } from '../../../../../domain/entities';
import { CompanyMySqlEntity, FeeMySqlEntity, OrderMySqlEntity } from './';

@Entity()
export class InvoiceMySqlEntity extends InvoiceDomainEntityBase {
  @PrimaryGeneratedColumn('uuid')
  invoiceId: string;

  @Column({ nullable: true })
  status: boolean;

  @OneToOne(() => CompanyMySqlEntity, (entity) => entity)
  company: CompanyMySqlEntity;

  @OneToOne(() => FeeMySqlEntity, (entity) => entity)
  fee: FeeMySqlEntity;

  @OneToOne(() => OrderMySqlEntity, (entity) => entity)
  order: OrderMySqlEntity;

  @Column({ type: 'bigint', nullable: true })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt: number;

  @Column({ type: 'bigint', nullable: true })
  deletedAt: number;
}
