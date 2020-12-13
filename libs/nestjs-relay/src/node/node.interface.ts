import { BaseEntity } from '@mikro-orm/core';
import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { NodeKey } from './node.key';

@InterfaceType('Node')
export class Node<T extends { id: string } = any, U = any> extends BaseEntity<
  T,
  'id'
> {
  @Field(() => ID)
  @NodeKey()
  id!: string;

  constructor(input: U) {
    super();
    this.assign(input);
  }
}
