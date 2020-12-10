import { Field, ObjectType } from '@nestjs/graphql';
import { AnyConstructor, Mixin } from '../../common';

export type PayloadEmptyMixin = Mixin<typeof PayloadEmptyMixin>;

export function PayloadEmptyMixin(mutationName: string) {
  @ObjectType(mutationName)
  class Payload {
    @Field({ nullable: true })
    clientMutationId?: string;
  }

  return Payload as AnyConstructor;
}
