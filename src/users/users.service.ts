import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserInput } from './dto/create-user.dto';
import { PartialUserInput } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { findAndPaginate } from '@harryy/nestjs-relay';
import { ListUserArgs } from './dto/list-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userInput: UserInput) {
    const createdUser = this.userRepository.create(userInput);
    return await this.userRepository.save(createdUser);
  }

  findAndPaginate(listUserArgs: ListUserArgs) {
    return findAndPaginate({}, listUserArgs, this.userRepository);
  }

  findOne(id: string) {
    return this.userRepository.findOneOrFail(id);
  }

  findAll() {
    return this.userRepository.find();
  }

  async update(id: string, userInput: PartialUserInput) {
    const user = await this.findOne(id);
    const updatedUser = this.userRepository.merge(user, userInput);
    return this.userRepository.save(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
