import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { Order } from "./orders/entities/order.entity";

@Module({
  imports: [OrdersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    entities: [Order],
  })]
})
export class AppModule {}
