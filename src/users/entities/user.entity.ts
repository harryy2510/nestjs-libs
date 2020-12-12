import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CreateNode, Node } from '@harryy/nestjs-relay';

@Entity('user')
@ObjectType({ implements: Node })
export class User extends CreateNode('User') {
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
