import { Type } from '@nestjs/common';
import {
  FieldOptions,
  Info,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLObjectType } from 'graphql';
import { GlobalId, GlobalIdType } from './global-id';

export type GlobalIdFieldOptions = Pick<FieldOptions, 'complexity'>;

export const GlobalIdField = (options?: GlobalIdFieldOptions) =>
  ResolveField(() => GlobalId, {
    name: 'id',
    nullable: false,
    ...options,
  });

export interface ResolverParent {
  id: GlobalIdType;
}

export interface ResolverInfo {
  parentType: Pick<GraphQLObjectType, 'name'>;
}

export interface GlobalIdFieldResolver {
  id(parent: ResolverParent | null, info: ResolverInfo): GlobalId;
}

export function GlobalIdFieldResolver<T>(
  classRef: Type<T>,
  idFieldOptions?: GlobalIdFieldOptions,
): Type<GlobalIdFieldResolver> {
  const globalIdFieldOptions = idFieldOptions || {};

  @Resolver(classRef, { isAbstract: true })
  abstract class GlobalIdFieldResolverHost {
    @GlobalIdField(globalIdFieldOptions)
    id(@Parent() parent: ResolverParent, @Info() info: ResolverInfo): GlobalId {
      if (!parent || !parent.id) {
        throw new Error(
          `Cannot resolve id when 'parent' or 'parent.id' is null`,
        );
      }
      switch (typeof parent.id) {
        case 'object':
          return parent.id;
        case 'string':
          return new GlobalId({
            type: info.parentType.name,
            id: parent.id,
          });
        case 'number':
          return new GlobalId({
            type: info.parentType.name,
            id: parent.id,
          });
      }
    }
  }

  return GlobalIdFieldResolverHost as Type<GlobalIdFieldResolver>;
}
