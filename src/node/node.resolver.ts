import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Node, parseId } from '@harryy/nestjs-relay';
import { UsersService } from 'src/users/users.service';
import { UserType } from '../users/entities/user.entity';

@Resolver(Node)
export class NodeResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Node, { nullable: true })
  node(@Args('id', { type: () => ID }) id: string): Promise<Node | undefined> {
    switch (parseId(id).type) {
      case UserType:
        return this.usersService.findOne(id);
      default:
        return null;
    }
  }
}
