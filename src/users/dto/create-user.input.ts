import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  firstName: string;

  @Field()
  lastName?: string;

  @Field()
  email: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  user: UserInput;
}
