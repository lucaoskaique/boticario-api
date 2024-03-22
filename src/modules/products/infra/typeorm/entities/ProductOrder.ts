import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Order } from './Order';
import { Product } from './Product';

@Entity('products_orders')
class ProductOrder {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  product_id: string;

  @Column('varchar')
  order_id: string;

  @Column('numeric')
  product_price: number;

  @Column('integer')
  product_count: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ProductOrder };
