import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
  userRepository: any;
  update(id: number, updatedUser: Partial<User>): User | PromiseLike<User> {
    throw new Error('Method not implemented.');
  }
  async findOneById(id: number): Promise<User | null> {
  return await this.userRepository.findOne({ where: { id } });
  }

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async create(data: Partial<User>): Promise<User> {
  const user = this.repo.create(data); // SIN volver a hacer bcrypt.hash
  return this.repo.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({ where: { username } });
  }

  async findByCorreo(correo: string): Promise<User | null> {
  return this.repo.findOne({ where: { correo } });
 }  
}
