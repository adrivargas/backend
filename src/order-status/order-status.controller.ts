import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatus } from './order-status.entity';

@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly service: OrderStatusService) {}

  @Get()
  findAll(): Promise<OrderStatus[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() status: Partial<OrderStatus>): Promise<OrderStatus> {
    return this.service.create(status);
  }
}
