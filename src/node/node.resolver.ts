import { Args, Query, Resolver } from '@nestjs/graphql';
import { GlobalId, GlobalIdType, Node } from '@harryy/nestjs-relay';
import { UsersService } from '../users/users.service';

@Resolver(Node)
export class NodeResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Node, { nullable: true })
  node(
    @Args('id', { type: () => GlobalId })
    globalId: GlobalIdType,
  ): Promise<Node | undefined> {
    switch (globalId.type) {
      case 'User':
        return this.usersService.findOne(globalId.toString());
      default:
        return null;
    }
  }
}
