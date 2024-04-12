import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseFilters, ForbiddenException } from '@nestjs/common';
import { HttpExceptionFilter } from "../common/http-exception.filter"
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { ResponseInterface } from 'src/common/response';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body() order: Partial<Order>): Promise<ResponseInterface> {
    await this.ordersService.create(order);
    return {
      status: 201,
      data: null,
      error: null
    }
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return await this.ordersService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() order: Order): Promise<Order> {
    return await this.ordersService.update(+id, order);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.ordersService.remove(+id);
  }
}
