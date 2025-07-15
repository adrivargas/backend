// auth.service.ts
import { Injectable } from '@nestjs/common';
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

  async register(dto: CreateUserDto) {
    // Verifica si ya existe el username
    const userExistente = await this.usersService.findByUsername(dto.username);
    if (userExistente) {
      throw new Error('El nombre de usuario ya está en uso.');
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Crea el usuario
    const nuevoUsuario = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    // Opcional: retorna JWT
    const payload = { username: nuevoUsuario.username, sub: nuevoUsuario.id, role: nuevoUsuario.role };
    return {
      message: 'Usuario registrado correctamente',
      access_token: this.jwtService.sign(payload),
      user: nuevoUsuario,
    };
  }

  async login(user: User) {
  const payload = { username: user.username, sub: user.id, role: user.role };

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
