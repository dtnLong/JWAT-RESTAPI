import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({schema: "jwat", name: "orders"})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "customer_id" })
  customerId: number;

  @Column({ name: "created_date", type: "timestamp" })
  createdDate: Date;

  @Column({ name: "last_updated", type: "timestamp" })
  lastUpdated: Date;

  @Column({ name: "payment_type" })
  paymentType: string;

  @Column()
  status: string;

  @Column()
  total: number;
}