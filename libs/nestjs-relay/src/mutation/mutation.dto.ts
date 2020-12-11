import { Type } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

function PayloadEmpty(): any {
  @ObjectType({ isAbstract: true })
  abstract class Payload {
    @Field(() => String, { nullable: true })
    clientMutationId?: string;
  }

  return Payload;
}

function PayloadWithClass<T>(classRef?: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class Payload {
    @Field(() => String, { nullable: true })
    clientMutationId?: string;

    @Field(() => classRef)
    payload: T;
  }

  return Payload;
}

export function MutationResponse<T>(classRef?: Type<T>): any {
  if (classRef) {
    return PayloadWithClass(classRef);
  }
  return PayloadEmpty();
}

@InputType({ isAbstract: true })
export abstract class MutationInput {
  @Field(() => String, { nullable: true })
  clientMutationId?: string;
}

export function createMutationResponse<T extends MutationInput, U>(
  input: T,
  payload?: U,
) {
  return {
    clientMutationId: input.clientMutationId,
    ...(payload ? { payload } : {}),
  };
}
