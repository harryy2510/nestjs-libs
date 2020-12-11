import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import {
  createMutationResponse,
  GlobalId,
  GlobalIdFieldResolver,
  GlobalIdType,
} from '@harryy/nestjs-relay';
import { CreateUserInput, CreateUserResponse } from './dto/create-user.dto';
import { ListUserArgs, ListUserResponse } from './dto/list-user.dto';
import { DeleteUserInput, DeleteUserResponse } from './dto/delete-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';

@Resolver(User)
export class UsersResolver extends GlobalIdFieldResolver(User) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Query(() => ListUserResponse, { name: 'users' })
  listUsers(@Args() listUserArgs: ListUserArgs) {
    return this.usersService.findAndPaginate(listUserArgs);
  }

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args('id', { type: () => GlobalId }) globalId: GlobalIdType) {
    return this.usersService.findOne(globalId.toString());
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
      await this.usersService.update(
        updateUserInput.id.toString(),
        updateUserInput.user,
      ),
    );
  }

  @Mutation(() => DeleteUserResponse)
  async deleteUser(@Args('input') deleteUserInput: DeleteUserInput) {
    await this.usersService.delete(deleteUserInput.id.toString());
    return createMutationResponse(deleteUserInput);
  }
}
