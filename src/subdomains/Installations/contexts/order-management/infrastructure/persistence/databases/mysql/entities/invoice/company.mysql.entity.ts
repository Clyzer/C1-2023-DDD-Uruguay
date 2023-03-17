import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  CompanyDomainEntityBase,
} from '../../../../../../domain/entities/invoice';

@Entity('Companys')
export class CompanyMySqlEntity extends CompanyDomainEntityBase {
  @PrimaryGeneratedColumn('uuid')
  companyId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  bankAccount: string;

  @Column({ type: 'bigint', nullable: true })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt: number;

  @Column({ type: 'bigint', nullable: true })
  deletedAt: number;
}
