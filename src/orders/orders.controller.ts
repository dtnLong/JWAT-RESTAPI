import { Controller, Get, Post, Body, Param, Delete, Put, UseFilters, HttpStatus, Patch, Query } from '@nestjs/common';
import { HttpExceptionFilter } from "src/common/http-exception.filter"
import { OrdersService } from './orders.service';
import { ResponseInterface } from 'src/common/response';
import { CreateOrderDto } from './dto/create-order.dto';
import { IdParam } from 'src/orders/dto/id-param.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { findAllDto } from './dto/find-all.dto';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body() order: CreateOrderDto): Promise<ResponseInterface> {
    return {
      status: HttpStatus.CREATED,
      data: await this.ordersService.create(order),
      error: null
    }
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  async findAll(@Query() queries?: findAllDto): Promise<ResponseInterface> {
    return {
      status: HttpStatus.OK,
      data: await this.ordersService.findAll(queries.search),
      error: null
    }
  }

  @Get('/:id')
  @UseFilters(HttpExceptionFilter)
  async findOne(@Param() params: IdParam): Promise<ResponseInterface> {
    return {
      status: HttpStatus.OK,
      data: await this.ordersService.findOne(params.id),
      error: null
    }
  }

  @Put('/:id')
  @UseFilters(HttpExceptionFilter)
  async update(@Param() params: IdParam, @Body() order: UpdateOrderDto): Promise<ResponseInterface> {
    return {
      status: HttpStatus.OK,
      data: await this.ordersService.update(params.id, order),
      error: null
    }
  }

  @Delete('/:id')
  @UseFilters(HttpExceptionFilter)
  async remove(@Param() params: IdParam): Promise<ResponseInterface> {
    return {
      status: HttpStatus.OK,
      data: await this.ordersService.remove(params.id),
      error: null
    }
  }
}
