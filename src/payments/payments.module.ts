import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller'; // si existe

@Module({
  imports: [TypeOrmModule.forFeature([Payment])], // 👈 REGISTRA REPOSITORIO
  controllers: [PaymentsController], // si tienes uno
  providers: [PaymentsService],
  exports: [PaymentsService], // si lo necesitas fuera del módulo
})
export class PaymentsModule {}
