import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Node, NodeKey } from '@harryy/nestjs-relay';
import { Entity, Property, Unique } from '@mikro-orm/core';
import { toGlobalId } from 'graphql-relay';
import { v4 } from 'uuid';

@Entity()
@ObjectType({ implements: Node })
export class User extends Node<User> {
  @Field(() => ID)
  @NodeKey('User')
  id: string = toGlobalId('User', v4());

  @Field()
  @Property()
  firstName!: string;

  @Field()
  @Property({ nullable: true })
  lastName?: string;

  @Field()
  @Unique()
  @Property()
  email!: string;

  @Field()
  @Property()
  createdAt: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ nullable: true })
  deleteAt?: Date;
}
