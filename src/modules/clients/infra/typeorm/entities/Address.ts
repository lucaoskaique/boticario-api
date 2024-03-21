import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('addresses')
class Address {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  cep: string;

  @Column('varchar')
  street: string;

  @Column('varchar')
  neighborhood: string;

  @Column('varchar')
  city: string;

  @Column('integer')
  street_number: number;

  @Column('varchar')
  complement: string;

  @Column('varchar')
  uf: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Address };
