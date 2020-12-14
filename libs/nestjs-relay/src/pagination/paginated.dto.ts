import { Field, ObjectType } from '@nestjs/graphql';
import * as Relay from 'graphql-relay';
import { PageInfo } from './page-info.type';
import { AnyFunction } from '../types';

export function Paginated<T>(typeFunc: AnyFunction): any {
  const classRef = typeFunc();

  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType implements Relay.Edge<T> {
    @Field(() => String)
    cursor: Relay.ConnectionCursor;

    @Field(() => classRef, { nullable: true })
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements Relay.Connection<T> {
    @Field(() => [EdgeType])
    edges: EdgeType[];

    @Field(() => PageInfo)
    pageInfo: Relay.PageInfo;
  }

  return PaginatedType;
}
