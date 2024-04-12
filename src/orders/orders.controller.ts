import { Controller, Get, Post, Body, Param, Delete, Put, UseFilters, HttpStatus } from '@nestjs/common';
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
      status: HttpStatus.CREATED,
      data: null,
      error: null
    }
  }

  @Get()
  async findAll(): Promise<ResponseInterface> {
    return {
      status: HttpStatus.OK,
      data: await this.ordersService.findAll(),
      error: null
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseInterface> {
    return {
      status: HttpStatus.OK,
      data: await this.ordersService.findOne(+id),
      error: null
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() order: Order): Promise<ResponseInterface> {
    return {
      status: HttpStatus.OK,
      data: await this.ordersService.update(+id, order),
      error: null
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseInterface> {
    return {
      status: HttpStatus.OK,
      data: await this.ordersService.remove(+id),
      error: null
    }
  }
}
