import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(order: Partial<Order>): Promise<void> {
    order.createdDate = new Date();
    order.lastUpdated = new Date();
    await this.ordersRepository.insert(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    return await this.ordersRepository.findOneBy({id});
  }

  async update(id: number, order: Partial<Order>): Promise<Order> {
    order.lastUpdated = new Date();
    await this.ordersRepository.update(id, order);
    return await this.ordersRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
