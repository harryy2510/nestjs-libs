import { ReturnTypeFunc } from '@nestjs/graphql';
import { AnyConstructor } from '../../common';
import { capitalise } from '../utils';
import { PayloadEmptyMixin } from './payload-empty.mixin';
import { PayloadMixin } from './payload.mixin';

export interface CreatePayloadTypeArgs {
  typeFunc: ReturnTypeFunc;
  mutationName: string;
}

export const getPayloadName = (mutationName: string): string =>
  capitalise(mutationName) + 'Response';

export class PayloadTypeFactory {
  static create(args: CreatePayloadTypeArgs): AnyConstructor {
    const mutationName = getPayloadName(args.mutationName);
    if (!args.typeFunc) {
      return PayloadEmptyMixin(mutationName);
    }
    const type = args.typeFunc() as AnyConstructor;
    return PayloadMixin(type, mutationName);
  }
}
