import { PrimaryColumn } from 'typeorm';
import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { createNodeId, registerNodePrefix } from './node.method';

export const NodeType = 'Node';
export const NodePrefix = 'nod';

registerNodePrefix(NodeType, NodePrefix);

@InterfaceType('Node')
export class Node<T = any> {
  @Field(() => ID)
  @PrimaryColumn({
    type: 'varchar',
    length: 25,
  })
  id: string = createNodeId(NodeType);

  constructor(input: Partial<T>) {
    Object.assign(this, input);
  }
}
