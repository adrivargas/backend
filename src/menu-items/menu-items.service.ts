import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuItem, MenuItemDocument } from './menu-item.schema';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectModel(MenuItem.name) private menuModel: Model<MenuItemDocument>,
  ) {}

  async findAll(): Promise<MenuItem[]> {
    return this.menuModel.find().exec();
  }

  async create(dto: CreateMenuItemDto): Promise<MenuItem> {
    return this.menuModel.create(dto);
  }

  async update(id: string, dto: UpdateMenuItemDto): Promise<MenuItem> {
    const item = await this.menuModel.findByIdAndUpdate(id, dto, { new: true });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  async remove(id: string): Promise<void> {
    const result = await this.menuModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Item no encontrado');
  }
}
