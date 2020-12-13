import { Field, ObjectType } from '@nestjs/graphql';
import { CreateNode, Node } from '@harryy/nestjs-relay';
import { Entity, Property, Unique } from '@mikro-orm/core';

@Entity()
@ObjectType({ implements: Node })
export class User extends CreateNode('User') {
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
