import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/decorators/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Put(':id')
async update(
  @Param('id') id: number,
  @Body() updatedUser: Partial<User>
): Promise<User> {
  const user = await this.usersService.findOneById(id);
  if (!user) throw new NotFoundException('Usuario no encontrado');
  return this.usersService.update(id, updatedUser);
}

}
