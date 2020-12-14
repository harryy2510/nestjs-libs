import { BaseEntity, PrimaryKey } from '@mikro-orm/core';
import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { createNodeId, registerNodePrefix } from './node.method';

export const NodeType = 'Node';
export const NodePrefix = 'nod';

registerNodePrefix(NodeType, NodePrefix);

@InterfaceType('Node')
export class Node<T extends { id: string } = any> extends BaseEntity<T, 'id'> {
  @Field(() => ID)
  @PrimaryKey()
  id: string = createNodeId(NodeType);

  constructor(input: Partial<T>) {
    super();
    this.assign(input);
  }
}
