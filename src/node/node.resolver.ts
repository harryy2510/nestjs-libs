import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Node } from '@harryy/nestjs-relay';
import { UsersService } from 'src/users/users.service';
import { fromGlobalId } from 'graphql-relay';

@Resolver(Node)
export class NodeResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Node, { nullable: true })
  node(@Args('id', { type: () => ID }) id: string): Promise<Node | undefined> {
    switch (fromGlobalId(id).type) {
      case 'User':
        return this.usersService.findOne(id);
      default:
        return null;
    }
  }
}
