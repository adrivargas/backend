import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from './decorators/public.decorator'; // corrige si la ruta es incorrecta
import { User } from 'src/users/user.entity';
import { LoginDto } from './dto/login.dto';
@Controller('auth') 
export class AuthController {
  userRepository: any;
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
    loginDto.username,
    loginDto.password,
  );
  if (!user) {
    throw new UnauthorizedException('Usuario o contraseña incorrectos');
  }

  return this.authService.login(user);
}


  async findByCorreo(correo: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { correo } });
  }
}
