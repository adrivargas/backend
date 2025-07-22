import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(dto: CreateUserDto) {
    // Validar duplicados
    const [usuarioPorUsername, usuarioPorCorreo] = await Promise.all([
      this.usersService.findByUsername(dto.username),
      this.usersService.findByCorreo(dto.correo),
    ]);

    if (usuarioPorUsername) {
      throw new BadRequestException('El nombre de usuario ya está en uso.');
    }

    if (usuarioPorCorreo) {
      throw new BadRequestException('El correo ya está en uso.');
    }

    // Registrar nuevo usuario
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const nuevoUsuario = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    const payload = {
      username: nuevoUsuario.username,
      sub: nuevoUsuario.id,
      role: nuevoUsuario.role,
    };

    return {
      message: 'Usuario registrado correctamente',
      access_token: this.jwtService.sign(payload),
      user: nuevoUsuario,
    };
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}
