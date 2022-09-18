import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private injectUser: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.injectUser.find();
  }

  findOne(id: number): Promise<User> {
    return this.injectUser.findOne({
      where: { id },
    });
  }
  findOneByUsername(email: string): Promise<User | undefined> {
    return this.injectUser.findOne({
      where: { email },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = this.injectUser.create(data);
    newUser.password = hash;
    return this.injectUser.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto): Promise<User> {
    const user = await this.injectUser.findOne({ where: { id } });
    this.injectUser.merge(user, changes);
    return this.injectUser.save(user);
  }
  async remove(id: number): Promise<any> {
    return await this.injectUser.delete(id);
  }
}
