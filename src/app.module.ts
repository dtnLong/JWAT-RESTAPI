import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { Order } from "./orders/entities/order.entity";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [OrdersModule, ConfigModule.forRoot({
      envFilePath: './.env',
    }), TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Order]
  })]
})
export class AppModule {}
