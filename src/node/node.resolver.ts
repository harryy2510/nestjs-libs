import { Resolver } from '@nestjs/graphql';
import {
  GlobalIdType,
  NodeFieldResolver,
  NodeInterface,
} from '@harryy/nestjs-relay';
import { UsersService } from '../users/users.service';

@Resolver(NodeInterface)
export class NodeResolver extends NodeFieldResolver {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  resolve(id: GlobalIdType): Promise<NodeInterface | undefined> {
    return undefined;
  }
}
