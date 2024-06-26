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

  @Column({ type: 'decimal', nullable: true })
  product_price: number;

  @Column({ type: 'integer', nullable: true })
  product_count: number;

  @ManyToOne(() => Product, (product) => product.productOrders)
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @ManyToOne(() => Order, (order) => order.productOrders)
  @JoinColumn({ name: 'order_id' })
  order?: Order;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ProductOrder };
