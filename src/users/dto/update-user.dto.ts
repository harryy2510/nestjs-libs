import { UserInput } from './create-user.dto';
import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import {
  GlobalId,
  GlobalIdType,
  MutationInput,
  MutationResponse,
} from '@harryy/nestjs-relay';
import { User } from '../entities/user.entity';

@InputType()
export class PartialUserInput extends PartialType(UserInput) {}

@InputType()
export class UpdateUserInput extends MutationInput {
  @Field(() => GlobalId)
  id: GlobalIdType;

  @Field()
  user: PartialUserInput;
}

@ObjectType()
export class UpdateUserResponse extends MutationResponse(User) {}
