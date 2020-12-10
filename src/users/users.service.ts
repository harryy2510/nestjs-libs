import { Inject, Injectable } from '@nestjs/common';
import { UserInput } from './dto/create-user.input';
import { PartialUserInput } from './dto/update-user.input';
import * as faker from 'faker';
import { ConnectionArgs, findAndPaginate } from '@harryy/nestjs-relay';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const createUser = () => {
  const gender = faker.random.number(1);
  const user = new User();
  user.firstName = faker.name.firstName(gender);
  user.lastName = faker.name.lastName(gender);
  user.email = faker.internet.email(user.firstName, user.lastName);
  return user;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(userInput: UserInput) {
    const user = await this.usersRepository.create(userInput);
    return await this.usersRepository.save(user);
  }

  findAndPaginate(connectionArgs: ConnectionArgs) {
    return findAndPaginate({}, connectionArgs, this.usersRepository);
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  update(id: string, userInput: PartialUserInput) {
    return this.usersRepository.update(id, userInput);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
