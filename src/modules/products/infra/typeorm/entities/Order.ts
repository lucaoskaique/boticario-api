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

import { Client } from '../../../../clients/infra/typeorm/entities/Client';
import { ProductOrder } from './ProductOrder';

export enum OrderStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity('orders')
class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  order_number: string;

  @Column({ type: 'numeric', nullable: true })
  amount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column('timestamp')
  order_date: Date;

  @Column('varchar')
  client_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'client_id' })
  client?: Client;

  // Relacionamento com ProductOrder
  @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
  productOrders?: ProductOrder[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Order };
