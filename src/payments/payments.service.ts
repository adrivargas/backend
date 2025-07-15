import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  findAll(): Promise<Payment[]> {
    return this.paymentRepo.find();
  }

  create(data: Partial<Payment>): Promise<Payment> {
    return this.paymentRepo.save(data);
  }
}
