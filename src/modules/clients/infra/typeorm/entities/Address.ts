import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('addresses')
class Address {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  cep: string;

  @Column({ type: 'varchar', nullable: true })
  street: string;

  @Column({ type: 'varchar', nullable: true })
  neighborhood: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'integer', nullable: true })
  street_number: number;

  @Column({ type: 'varchar', nullable: true })
  complement: string;

  @Column({ type: 'varchar', nullable: true })
  uf: string;

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

export { Address };
