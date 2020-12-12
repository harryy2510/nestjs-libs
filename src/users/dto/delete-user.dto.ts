import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { MutationInput, MutationResponse } from '@harryy/nestjs-relay';

@InputType()
export class DeleteUserInput extends MutationInput {
  @Field(() => ID)
  id: string;
}

@ObjectType()
export class DeleteUserResponse extends MutationResponse() {}
