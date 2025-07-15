import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './guards/local-auth.guard';

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
    throw new Error('Credenciales inválidas');
  }

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const hashed = await bcrypt.hash(body.password, 10);
    const newUser = {
      username: body.username,
      password: hashed,
      role: 'user', // Forzamos el rol "user"
    };
  return this.usersService.create(newUser);
  }
}
