import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './order-status.entity';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller'; // si tienes controlador

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus])],
  controllers: [OrderStatusController], // si aplica
  providers: [OrderStatusService],
  exports: [OrderStatusService],
})
export class OrderStatusModule {}
