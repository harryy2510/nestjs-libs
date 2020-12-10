import { Field, InterfaceType } from '@nestjs/graphql';
import { GlobalId, GlobalIdType } from '../global-id';
import { PrimaryGeneratedColumn } from 'typeorm';

@InterfaceType('Node')
export class NodeInterface {
  @Field(() => GlobalId)
  @PrimaryGeneratedColumn('uuid')
  id: GlobalIdType;
}
