import { NodeInterface, NodeType } from '@harryy/nestjs-relay';
import { Field } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@NodeType()
@Entity('user')
export class User extends NodeInterface {
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
