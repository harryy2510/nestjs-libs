import { FieldOptions, Query, ReturnTypeFunc } from '@nestjs/graphql';
import { ConnectionTypeFactory } from '../connection/connection-type.factory';
import { MetadataStorage } from '../common';

export type PaginationQueryOptions = Omit<FieldOptions, 'nullable'>;

export function PaginationQuery(
  nodeTypeFunc: ReturnTypeFunc,
  options?: PaginationQueryOptions,
): MethodDecorator {
  return (
    target: Record<string, any>,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const nodeType = nodeTypeFunc() as Function;
    const typeMetadata = MetadataStorage.getClassMetadata({ target: nodeType });
    const connection = ConnectionTypeFactory.create({
      nodeTypeFunc,
      nodeTypeName: typeMetadata.name,
    });

    const resolveFieldOptions = { ...options, nullable: true };
    Query(() => connection, resolveFieldOptions)(target, key, descriptor);
  };
}
