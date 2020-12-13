import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserInput } from './dto/create-user.dto';
import { PartialUserInput } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { findAndPaginate } from '@harryy/nestjs-relay';
import { ListUserArgs } from './dto/list-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
  ) {}

  async create(userInput: UserInput) {
    const createdUser = new User(userInput as any);
    await this.userRepository.nativeInsert(createdUser);
    return createdUser;
  }

  findAndPaginate(listUserArgs: ListUserArgs) {
    return findAndPaginate({}, listUserArgs, this.userRepository);
  }

  findOne(id: string) {
    return this.userRepository.findOne({ id });
  }

  findAll() {
    return this.userRepository.findAll();
  }

  update(id: string, userInput: PartialUserInput) {
    return this.userRepository.nativeUpdate({ id }, userInput);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.remove({ where: { id } });
  }
}
