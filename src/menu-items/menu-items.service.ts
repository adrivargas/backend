import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemsService {
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

  async update(id: string, updateData: UpdateMenuItemDto): Promise<MenuItem> {
    const item = await this.menuItemRepo.findOne({ where: { id: parseInt(id) } });
    if (!item) throw new NotFoundException('Menu item not found');

    const updated = Object.assign(item, updateData);
    return this.menuItemRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.menuItemRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Item no encontrado');
    }
  }
}
