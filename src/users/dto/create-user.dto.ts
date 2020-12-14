import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MutationInput, MutationResponse } from '@harryy/nestjs-relay';
import { User } from '../entities/user.entity';

@InputType()
export class UserInput {
  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  email: string;
}

@InputType()
export class CreateUserInput extends MutationInput {
  @Field()
  user: UserInput;
}

@ObjectType()
export class CreateUserResponse extends MutationResponse(() => User) {}
