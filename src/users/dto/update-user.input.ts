import { UserInput } from './create-user.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GlobalId, GlobalIdType } from '@harryy/nestjs-relay';

@InputType()
export class PartialUserInput extends PartialType(UserInput) {}

@InputType()
export class UpdateUserInput {
  @Field(() => GlobalId)
  id: GlobalIdType;

  @Field()
  user: PartialUserInput;
}
