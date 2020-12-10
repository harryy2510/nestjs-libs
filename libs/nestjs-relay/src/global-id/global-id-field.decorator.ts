import { ResolveField, FieldOptions } from '@nestjs/graphql';
import { GlobalId } from './global-id.class';

export type GlobalIdFieldOptions = Pick<FieldOptions, 'complexity'>;

export const GlobalIdField = (options?: GlobalIdFieldOptions) =>
  ResolveField(() => GlobalId, {
    name: 'id',
    nullable: false,
    ...options,
  });
