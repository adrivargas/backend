import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MenuItem, MenuItemDocument } from './schemas/menu-item.schema';
import { Model } from 'mongoose';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuItem.name) private menuModel: Model<MenuItemDocument>,
  ) {}

  async findAll(): Promise<MenuItem[]> {
    return this.menuModel.find().exec();
  }

  async create(item: MenuItem): Promise<MenuItem> {
    const created = new this.menuModel(item);
    return created.save();
  }
}
