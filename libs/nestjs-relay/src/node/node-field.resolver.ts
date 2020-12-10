import { Args, Query, Resolver } from '@nestjs/graphql';
import { NodeInterface } from './node.interface';
import { GlobalId, GlobalIdType } from '../global-id';

export type ResolvedNode = NodeInterface | undefined | null;

export interface NodeResolver {
  resolveNode(id: GlobalIdType): Promise<ResolvedNode>;
}

@Resolver(NodeInterface)
export class NodeFieldResolver implements NodeResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolveNode(id: GlobalIdType): Promise<ResolvedNode> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolveNodes(ids: GlobalIdType[]): Promise<ResolvedNode[]> {
    throw new Error('Method not implemented.');
  }

  @Query(() => NodeInterface, { name: 'node', nullable: true })
  node(@Args('id', { type: () => GlobalId }) id: GlobalIdType) {
    return this.resolveNode(id);
  }

  @Query(() => [NodeInterface], { name: 'nodes', nullable: true })
  nodes(@Args('ids', { type: () => [GlobalId] }) ids: GlobalIdType[]) {
    return this.resolveNodes(ids);
  }
}
