import {
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Category } from './Category';
import { ProductOrder } from './ProductOrder';

@Entity('products')
class Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'numeric', nullable: true })
  price: number;

  @Column({ type: 'integer', nullable: true })
  inventory_count: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column('varchar')
  category_id: string;

  @Column({ type: 'varchar', nullable: true })
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.product)
  productOrders?: ProductOrder[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Product };
