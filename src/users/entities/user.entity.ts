import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  createNodeId,
  Node,
  NodeIdColumn,
  registerNodePrefix,
} from '@harryy/nestjs-relay';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

export const UserType = 'User';
export const UserPrefix = 'usr';

registerNodePrefix(UserType, UserPrefix);

@Entity()
@ObjectType({ implements: Node })
export class User extends Node<User> {
  @Field(() => ID)
  @NodeIdColumn()
  id: string = createNodeId(UserType);

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column({ nullable: true })
  lastName?: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
