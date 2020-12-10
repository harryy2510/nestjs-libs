import { Type } from '@nestjs/common';
import { Info, Parent, Resolver } from '@nestjs/graphql';
import { GraphQLObjectType } from 'graphql';
import { GlobalIdType } from './global-id.type';
import { GlobalId } from './global-id.class';
import {
  GlobalIdField,
  GlobalIdFieldOptions,
} from './global-id-field.decorator';

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
