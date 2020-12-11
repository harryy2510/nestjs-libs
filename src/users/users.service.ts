import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInput } from './dto/create-user.dto';
import { ListUserArgs } from './dto/list-user.dto';
import { findAndPaginate } from '@harryy/nestjs-relay';
import { PartialUserInput } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(userInput: UserInput) {
    const user = await this.usersRepository.create(userInput);
    return await this.usersRepository.save(user);
  }

  findAndPaginate(listUserArgs: ListUserArgs) {
    return findAndPaginate({}, listUserArgs, this.usersRepository);
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  findAll() {
    return this.usersRepository.find();
  }

  update(id: string, userInput: PartialUserInput) {
    return this.usersRepository.update(id, userInput);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
