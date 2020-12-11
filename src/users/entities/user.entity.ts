import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { Node } from '@harryy/nestjs-relay';

@Entity('user')
@ObjectType({ implements: Node })
export class User extends Node {
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName?: string;

  @Field()
  @Column({ unique: true })
  email: string;
}
