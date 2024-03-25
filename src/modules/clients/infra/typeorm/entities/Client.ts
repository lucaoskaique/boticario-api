import { Order } from '@modules/products/infra/typeorm/entities/Order';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Address } from './Address';

@Entity('clients')
class Client {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', unique: true })
  cpf: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'timestamp', nullable: true })
  birth_date: Date;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Order, (order) => order.client)
  orders?: Order[];

  @Column('varchar')
  address_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Client };
