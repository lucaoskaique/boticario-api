import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { ProductOrder } from './ProductOrder';

@Entity('orders')
class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  order_number: string;

  @Column('numeric')
  amount: number;

  @Column('varchar')
  status: string;

  @Column('timestamp')
  order_date: Date;

  @Column('varchar')
  client_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relacionamento com ProductOrder
  @ManyToOne(() => ProductOrder, (productOrder) => productOrder.order)
  productOrders: ProductOrder[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Order };
