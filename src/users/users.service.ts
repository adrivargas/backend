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

  create(data: Partial<User>): Promise<User> {
    return this.repo.save(data);
  }

  async findByUsername(username: string): Promise<User | null> {
  return this.repo.findOne({ where: { username } });
  }

}
