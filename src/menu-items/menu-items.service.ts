import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';

@Injectable()
export class MenuItemsService {
  menuItemModel: any;

  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepo: Repository<MenuItem>,
  ) {}

  findAll(): Promise<MenuItem[]> {
    return this.menuItemRepo.find();
  }

  create(dto: CreateMenuItemDto): Promise<MenuItem> {
    const item = this.menuItemRepo.create(dto);
    return this.menuItemRepo.save(item);
  }
  async update(id: string, updateData: Partial<MenuItem>): Promise<MenuItem> {
  await this.menuItemModel.updateOne({ _id: id }, updateData);
  return this.menuItemModel.findById(id);
  }

  async remove(id: number): Promise<void> {
  await this.menuItemRepo.delete(id);
  }
}
