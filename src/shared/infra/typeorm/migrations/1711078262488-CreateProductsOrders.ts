import {
  TableForeignKey,
  type MigrationInterface,
  type QueryRunner,
  Table,
} from 'typeorm';

export class CreateProductsOrders1711078262488 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products_orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'product_price',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'product_count',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'products_orders',
      new TableForeignKey({
        name: 'FK_product_id',
        columnNames: ['product_id'],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'products_orders',
      new TableForeignKey({
        name: 'FK_order_id',
        columnNames: ['order_id'],
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products_orders');
  }
}
