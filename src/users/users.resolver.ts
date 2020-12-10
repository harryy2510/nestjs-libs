import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {
  ConnectionArgs,
  GlobalId,
  GlobalIdFieldResolver,
  GlobalIdType,
  InputArg,
  PaginationQuery,
  RelayMutation,
} from '@harryy/nestjs-relay';
import { DeleteUserInput } from './dto/delete-user.input';

@Resolver(() => User)
export class UsersResolver extends GlobalIdFieldResolver(User) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @PaginationQuery(() => User, { name: 'users' })
  listUsers(@Args() connectionArgs: ConnectionArgs) {
    return this.usersService.findAndPaginate(connectionArgs);
  }

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args('id', { type: () => GlobalId }) globalId: GlobalId) {
    return this.usersService.findOne(globalId.value);
  }

  @RelayMutation(() => User)
  createUser(
    @InputArg(() => CreateUserInput) createUserInput: CreateUserInput,
  ) {
    return this.usersService.create(createUserInput.user);
  }

  @RelayMutation(() => User)
  updateUser(
    @InputArg(() => UpdateUserInput) updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(
      updateUserInput.id.value,
      updateUserInput.user,
    );
  }

  @RelayMutation()
  deleteUser(@InputArg(() => DeleteUserInput) globalId: GlobalIdType) {
    return this.usersService.delete(globalId.type);
  }
}
