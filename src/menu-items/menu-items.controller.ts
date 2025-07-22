import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get()
  findAll() {
    return this.menuItemsService.findAll();
  }

  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateMenuItemDto) {
    return this.menuItemsService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemsService.remove(id);
  }

}
