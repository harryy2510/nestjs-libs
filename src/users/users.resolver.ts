import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { createMutationResponse } from '@harryy/nestjs-relay';
import { CreateUserInput, CreateUserResponse } from './dto/create-user.dto';
// import { ListUserArgs, ListUserResponse } from './dto/list-user.dto';
import { DeleteUserInput, DeleteUserResponse } from './dto/delete-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { ListUserArgs, ListUserResponse } from './dto/list-user.dto';

@Resolver(User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => ListUserResponse, { name: 'users' })
  listUsers(@Args() listUserArgs: ListUserArgs) {
    return this.usersService.findAndPaginate(listUserArgs);
  }

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => CreateUserResponse)
  async createUser(@Args('input') createUserInput: CreateUserInput) {
    return createMutationResponse(
      createUserInput,
      await this.usersService.create(createUserInput.user),
    );
  }

  @Mutation(() => User)
  async updateUser(@Args('input') updateUserInput: UpdateUserInput) {
    return createMutationResponse(
      updateUserInput,
      await this.usersService.update(updateUserInput.id, updateUserInput.user),
    );
  }

  @Mutation(() => DeleteUserResponse)
  async deleteUser(@Args('input') deleteUserInput: DeleteUserInput) {
    await this.usersService.delete(deleteUserInput.id);
    return createMutationResponse(deleteUserInput);
  }
}
