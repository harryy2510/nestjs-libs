import { BaseEntity } from '@mikro-orm/core';
import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { NodeKey } from './node.key';

@InterfaceType('Node')
export class Node<T extends { id: string } = any> extends BaseEntity<T, 'id'> {
  @Field(() => ID)
  @NodeKey()
  id!: string;

  constructor(input: T) {
    super();
    this.assign(input);
  }
}
