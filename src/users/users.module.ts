import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // si tienes
import { User } from './user.entity';
import { RolesGuard } from 'src/auth/decorators/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 ESTO ES OBLIGATORIO
  controllers: [UsersController], // si lo tienes
  providers: [UsersService,RolesGuard],
  exports: [UsersService], // si otros módulos lo usan
})
export class UsersModule {}
