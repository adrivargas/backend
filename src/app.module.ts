import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';

import { User } from './users/user.entity';
import { Table } from './tables/table.entity';
import { Payment } from './payments/payment.entity';
import { OrderStatus } from './order-status/order-status.entity';
import { UsersModule } from './users/users.module';
import { TablesModule } from './tables/tables.module';
import { PaymentsModule } from './payments/payments.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { AuthModule } from './auth/auth.module';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'; // Asegúrate que este archivo exista

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [User, Table, Payment, OrderStatus],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    TablesModule,
    PaymentsModule,
    OrderStatusModule,

    MenuModule,
    OrdersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // ✅ Esto lo vuelve global
    },
  ],
})
export class AppModule {}
