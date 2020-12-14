import { Field, ID, ObjectType } from '@nestjs/graphql';
import { createNodeId, Node, registerNodePrefix } from '@harryy/nestjs-relay';
import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

export const UserType = 'User';
export const UserPrefix = 'usr';

registerNodePrefix(UserType, UserPrefix);

@Entity()
@ObjectType({ implements: Node })
export class User extends Node<User> {
  @Field(() => ID)
  @PrimaryKey()
  id: string = createNodeId(UserType);

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
