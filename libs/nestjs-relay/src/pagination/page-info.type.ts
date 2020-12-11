import { Field, ObjectType } from '@nestjs/graphql';
import * as Relay from 'graphql-relay';

@ObjectType()
export class PageInfo implements Relay.PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field(() => String, { nullable: true })
  startCursor?: Relay.ConnectionCursor;

  @Field(() => String, { nullable: true })
  endCursor?: Relay.ConnectionCursor;
}
