import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { ORDER_STATUS } from 'src/common/constants';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private dataSource: DataSource
  ) {}

  async create(orderDto: CreateOrderDto): Promise<Partial<Order>> {
    let createdOrder: Order;
    await this.dataSource.transaction(async manager => {
      let order: Partial<Order> = { ...orderDto }

      order.createdDate = new Date();
      order.lastUpdated = new Date();
      order.status = ORDER_STATUS.PENDING;
      createdOrder = await manager.save(Order, order);
      createdOrder = await manager.findOneBy(Order, {id: createdOrder.id})
    })
    return createdOrder;
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({id})
    if (order == null) {
      throw new NotFoundException("Order not found!");
    }
    return order;
  }

  async update(id: number, orderDto: UpdateOrderDto): Promise<Order> {
    let updatedValue: Order;
    await this.dataSource.transaction(async manager => {
      let order: Partial<Order> = await manager.findOneBy(Order, {id: id});
      
      if (order == null) {
        throw new NotFoundException("Order not found!");
      }

      order = { ...order, ...orderDto }
      order.lastUpdated = new Date();

      await manager.save(Order, order);
      updatedValue = await manager.findOneBy(Order, {id: id});
    });
    return updatedValue;
  }

  async remove(id: number): Promise<void> {
    await this.dataSource.transaction(async manager => {
      const order = await manager.findOneBy(Order, {id: id});
      if (order == null) {
        throw new NotFoundException("Order not found!");
      }
      
      await manager.delete(Order, {id: id});
    });
  }
}
