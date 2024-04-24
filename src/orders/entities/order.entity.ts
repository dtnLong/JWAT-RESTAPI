import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, IsNull } from 'typeorm';

@Entity({schema: "jwat", name: "orders"})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "customer_id", type: "int", nullable: false })
  customerId: number;

  // @Column({ name: "created_date", type: "timestamptz" })
  // createdDate: Date;

  // @Column({ name: "last_updated", type: "timestamptz" })
  // lastUpdated: Date;

  @Column({ name: "payment_type", nullable: false })
  paymentType: string;

  @Column({ nullable: false })
  status: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0, nullable: false})
  total: number;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date
}