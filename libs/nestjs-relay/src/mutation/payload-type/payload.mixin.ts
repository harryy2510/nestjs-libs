import { Field, ObjectType } from '@nestjs/graphql';
import { AnyConstructor, Mixin } from '../../common';

export type PayloadMixin = Mixin<typeof PayloadMixin>;

export function PayloadMixin<TBase extends AnyConstructor>(
  base: TBase,
  mutationName: string,
) {
  @ObjectType(mutationName)
  class Payload {
    @Field({ nullable: true })
    clientMutationId?: string;

    @Field(() => base, { nullable: true })
    payload?: TBase;
  }

  return Payload as AnyConstructor;
}
