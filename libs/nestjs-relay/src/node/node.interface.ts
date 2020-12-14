import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { createNodeId, registerNodePrefix } from './node.method';
import { NodeIdColumn } from './node.column';

export const NodeType = 'Node';
export const NodePrefix = 'nod';

registerNodePrefix(NodeType, NodePrefix);

@InterfaceType('Node')
export class Node<T = any> {
  @Field(() => ID)
  @NodeIdColumn()
  id: string = createNodeId(NodeType);

  constructor(input: Partial<T>) {
    Object.assign(this, input);
  }
}
