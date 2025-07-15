import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.usersService.findByUsername(body.username);
    if (user && await bcrypt.compare(body.password, user.password)) {
      return this.authService.login(user);
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

    @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
