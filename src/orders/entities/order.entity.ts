import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({schema: "jwat", name: "orders"})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "customer_id" })
  customerId: number;

  @Column({ name: "created_date", type: "timestamptz" })
  createdDate: Date;

  @Column({ name: "last_updated", type: "timestamptz" })
  lastUpdated: Date;

  @Column({ name: "payment_type" })
  paymentType: string;

  @Column()
  status: string;

  @Column('decimal', {
    precision: 14,
    scale: 2,
  })
  total: number;
}