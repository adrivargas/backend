import { Controller, Get, Post, Body } from '@nestjs/common';
import { TablesService } from './tables.service';
import { Table } from './table.entity';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  findAll(): Promise<Table[]> {
    return this.tablesService.findAll();
  }

  @Post()
  create(@Body() table: Partial<Table>): Promise<Table> {
    return this.tablesService.create(table);
  }
}
