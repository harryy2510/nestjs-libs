import { Field, InputType } from '@nestjs/graphql';
import { GlobalId, GlobalIdType } from '@harryy/nestjs-relay';

@InputType()
export class DeleteUserInput {
  @Field(() => GlobalId)
  id: GlobalIdType;
}
