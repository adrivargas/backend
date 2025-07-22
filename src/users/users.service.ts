import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  userRepository: any;

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

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = this.repo.create({ ...data, password: hashedPassword });
  return this.repo.save(user);
  }


  async findByUsername(username: string): Promise<User | null> {
  return this.repo.findOne({ where: { username } });
  }

  async findByCorreo(correo: string): Promise<User> {
  return this.userRepository.findOne({ where: { correo } });
}

}
