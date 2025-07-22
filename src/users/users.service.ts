import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async create(data: Partial<User>): Promise<User> {
    if (!data.password) {
      throw new Error('Password is required');
    }

    // YA NO HACEMOS bcrypt aquí
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({ where: { username } });
  }

  async findByCorreo(correo: string): Promise<User | null> {
  return this.repo.findOne({ where: { correo } });
 }  
}
