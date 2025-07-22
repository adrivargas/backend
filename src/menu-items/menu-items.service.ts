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
  async update(id: number, updateData: Partial<MenuItem>): Promise<MenuItem> {
  await this.menuItemRepo.update(id, updateData);

  const updatedItem = await this.menuItemRepo.findOne({ where: { id } });

  if (!updatedItem) {
    throw new NotFoundException(`Item con id ${id} no encontrado`);
  }

  return updatedItem;
  }
  async remove(id: number): Promise<void> {
  await this.menuItemRepo.delete(id);
  }
}
