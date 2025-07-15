import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepo: Repository<Table>,
  ) {}

  findAll(): Promise<Table[]> {
    return this.tableRepo.find();
  }

  create(data: Partial<Table>): Promise<Table> {
    return this.tableRepo.save(data);
  }
}
