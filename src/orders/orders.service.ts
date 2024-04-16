import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UnorderedBulkOperation } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { ORDER_PAYMENT_TYPE } from 'src/common/constants';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private dataSource: DataSource
  ) {}

  #validateInput(orderPaymentType: string, orderStatus: string): void {
    if (orderPaymentType != null && ORDER_PAYMENT_TYPE[orderPaymentType.toUpperCase()] === undefined) {
      throw new BadRequestException("Invalid payment type!");
    }

    if (orderStatus != null && ORDER_PAYMENT_TYPE[orderStatus.toUpperCase()] === undefined) {
      throw new BadRequestException("Invalid status!");
    }
  }

  async create(orderDto: CreateOrderDto): Promise<Partial<Order>> {
    let createdOrder: Order;
    await this.dataSource.transaction(async manager => {
      let order: Partial<Order> = { ...orderDto }

      this.#validateInput(order.paymentType, order.status);

      order.createdDate = new Date();
      order.lastUpdated = new Date();
      createdOrder = await manager.save(Order, order);
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
        throw new NotFoundException("Order Id not found!");
      }

      this.#validateInput(orderDto.paymentType, orderDto.status);

      order = { ...orderDto }
      order.lastUpdated = new Date();

      updatedValue = await manager.save(Order, order);
    });
    return updatedValue;
  }

  async remove(id: number): Promise<void> {
    await this.dataSource.transaction(async manager => {
      const order = await manager.findOneBy(Order, {id: id});
      if (order == null) {
        throw new NotFoundException("Order Id not found!");
      }

      await manager.remove(id);
    });
  }
}
