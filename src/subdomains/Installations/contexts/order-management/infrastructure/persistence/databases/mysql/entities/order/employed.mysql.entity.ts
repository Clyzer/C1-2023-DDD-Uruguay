import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EmployedDomainEntityBase } from '../../../../../../domain/entities/order';

@Entity()
export class EmployedMySqlEntity extends EmployedDomainEntityBase {
  @PrimaryGeneratedColumn('uuid')
  employedId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'bigint', nullable: true })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt: number;

  @Column({ type: 'bigint', nullable: true })
  deletedAt: number;
}
