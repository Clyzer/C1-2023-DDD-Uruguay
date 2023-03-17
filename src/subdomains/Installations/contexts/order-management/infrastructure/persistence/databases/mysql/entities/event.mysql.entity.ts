import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Events')
export class EventMySqlEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column("longtext", { nullable: true })
    type: string;
  
    @Column("longtext", { nullable: true })
    data: string;
  
    @Column("longtext", { nullable: true })
    createdAt: number;
  }
  