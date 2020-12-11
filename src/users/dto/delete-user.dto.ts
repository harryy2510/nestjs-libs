import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  GlobalId,
  GlobalIdType,
  MutationInput,
  MutationResponse,
} from '@harryy/nestjs-relay';

@InputType()
export class DeleteUserInput extends MutationInput {
  @Field(() => GlobalId)
  id: GlobalIdType;
}

@ObjectType()
export class DeleteUserResponse extends MutationResponse() {}
