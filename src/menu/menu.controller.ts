import { Controller, Get, Post, Body } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuItem } from './schemas/menu-item.schema';
import { Public } from '../auth/decorators/public.decorator'; 
@Controller('menu-items')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @Public() // <- 🔓 Esta línea hace la ruta accesible sin JWT
  findAll() {
    return this.menuService.findAll();
  }

  @Post()
  create(@Body() item: MenuItem) {
    return this.menuService.create(item);
  }
}
