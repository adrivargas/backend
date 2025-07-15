import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from './order-status.entity';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly repo: Repository<OrderStatus>,
  ) {}

  findAll(): Promise<OrderStatus[]> {
    return this.repo.find();
  }

  create(data: Partial<OrderStatus>): Promise<OrderStatus> {
    return this.repo.save(data);
  }
}
