import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Table } from './table.entity';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller'; // si existe

@Module({
  imports: [TypeOrmModule.forFeature([Table])], // 👈 REGISTRA EL REPOSITORIO
  controllers: [TablesController], // si tienes uno
  providers: [TablesService],
  exports: [TablesService], // si lo usas fuera
})
export class TablesModule {}
