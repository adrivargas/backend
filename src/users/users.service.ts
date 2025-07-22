import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async update(id: number, updatedUser: Partial<User>): Promise<User> {
    await this.repo.update(id, updatedUser);
    const updated = await this.repo.findOne({ where: { id } });
    if (!updated) throw new NotFoundException('Usuario no encontrado después de actualizar');
    return updated;
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.repo.findOne({ where: { id } });
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async create(data: Partial<User>): Promise<User> {
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
