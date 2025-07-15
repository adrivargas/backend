import { Controller, Post, Get, Body } from '@nestjs/common';
import { OrdersService } from './orders/orders.service';
import { Order } from './orders/schemas/orders.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() order: Order) {
    return this.ordersService.create(order);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
