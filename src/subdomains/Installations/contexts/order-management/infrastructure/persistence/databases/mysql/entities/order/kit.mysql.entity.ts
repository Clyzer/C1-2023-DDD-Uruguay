import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { KitDomainEntityBase } from '../../../../../../domain/entities/order';

@Entity()
export class KitMySqlEntity extends KitDomainEntityBase {
  @PrimaryGeneratedColumn('uuid')
  kitId: string;

  @Column({ nullable: true })
  model: string;

  @Column({ type: 'bigint', nullable: true })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt: number;

  @Column({ type: 'bigint', nullable: true })
  deletedAt: number;
}
