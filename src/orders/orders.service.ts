import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { ORDER_STATUS } from 'src/common/constants';
import { removeNullProperties } from 'src/util/remove-null-props';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private dataSource: DataSource
  ) {}

  /**
   * Create a new order in Orders table
   * 
   * @param {CreateOrderDto} orderDto order property to be created
   * @returns {Promise<Order>} Created order
   */
  async create(orderDto: CreateOrderDto): Promise<Order> {
    let createdOrder: Order;
    await this.dataSource.transaction(async manager => {
      let order: Partial<Order> = { ...orderDto }
      order.createdDate = new Date();
      order.lastUpdated = new Date();
      order.status = ORDER_STATUS.ACCEPTED;
      
      createdOrder = await manager.save(Order, order);
      createdOrder = await manager.findOneBy(Order, {id: createdOrder.id})
    })
    return createdOrder;
  }

  /**
   * Return all order from the Orders table
   * @param {string} search search param for payment and status
   * @returns {Order[]} Created order
   */
  async findAll(search?: string): Promise<Order[]> {
    return await this.ordersRepository.find({
      where: [
        {paymentType: ILike(`%${search}%`)},
        {status: ILike(`%${search}%`)}
      ]}
    );
  }

  /**
   * Return an order by order id from the Orders table
   * @param {number} id order id
   * @returns {Order} An order with the order id
   * @throws {NotFoundException} If the order is not found with the id
   */
  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({id});

    // Validate that order exist
    if (order == null) {
      throw new NotFoundException("Order not found!");
    }

    return order;
  }

  /**
   * Update an order with the order id in the Orders table
   * @param {number} id order id
   * @param {UpdateOrderDto} orderDto order property to be updated
   * @returns {Order} Updated order
   * @throws {NotFoundException} If the order is not found with the id
   */
  async update(id: number, orderDto: UpdateOrderDto): Promise<Order> {
    let updatedValue: Order;
    await this.dataSource.transaction(async manager => {
      let order: Partial<Order> = await manager.findOneBy(Order, {id: id});

      // Validate that order exist
      if (order == null) {
        throw new NotFoundException("Order not found!");
      }

      // Overwrite current order with new properties value
      // Then update last updated date
      orderDto = removeNullProperties(orderDto);
      order = { ...order, ...orderDto };
      order.lastUpdated = new Date();

      await manager.save(Order, order);
      updatedValue = await manager.findOneBy(Order, {id: id});
    });
    return updatedValue;
  }

  /**
   * Remove an order with the order id from Orders table
   * @param {number} id order id
   * @throws {NotFoundException} If the order is not found with the id
   * @returns {Promise<Order>} Removed order
   */
  async remove(id: number): Promise<Order> {
    let order: Order;
    await this.dataSource.transaction(async manager => {
      order = await manager.findOneBy(Order, {id: id});

      // Validate that order exist
      if (order == null) {
        throw new NotFoundException("Order not found!");
      }
      
      await manager.delete(Order, {id: id});
    });
    return order;
  }
}
