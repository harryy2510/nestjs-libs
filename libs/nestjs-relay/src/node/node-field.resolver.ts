import { Args, Query, Resolver } from '@nestjs/graphql';
import { NodeInterface } from './node.interface';
import { GlobalId, GlobalIdType } from '../global-id';

export interface NodeResolver {
  resolve(id: GlobalIdType): Promise<NodeInterface | undefined>;
}

@Resolver(NodeInterface)
export class NodeFieldResolver implements NodeResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(id: GlobalIdType): Promise<NodeInterface | undefined> {
    throw new Error('Method not implemented.');
  }

  @Query(() => NodeInterface, { name: 'node', nullable: true })
  node(@Args('id', { type: () => GlobalId }) id: GlobalIdType) {
    return this.resolve(id);
  }
}
