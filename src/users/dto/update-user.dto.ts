import { UserInput } from './create-user.dto';
import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { MutationInput, MutationResponse } from '@harryy/nestjs-relay';
import { User } from '../entities/user.entity';

@InputType()
export class PartialUserInput extends PartialType(UserInput) {}

@InputType()
export class UpdateUserInput extends MutationInput {
  @Field(() => ID)
  id: string;

  @Field()
  user: PartialUserInput;
}

@ObjectType()
export class UpdateUserResponse extends MutationResponse(() => User) {}
