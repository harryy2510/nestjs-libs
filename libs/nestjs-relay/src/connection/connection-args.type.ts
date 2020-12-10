import { ArgsType, Field } from '@nestjs/graphql';
import * as Relay from 'graphql-relay';
import {
  Min,
  Validate,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class CannotUseWithout implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const required = args.constraints[0] as string;
    return object[required] !== undefined;
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used without \`${args.constraints[0]}\`.`;
  }
}

@ValidatorConstraint({ async: false })
class CannotUseWith implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    return args.constraints.every((propertyName) => {
      return object[propertyName] === undefined;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used with \`${args.constraints.join('` , `')}\`.`;
  }
}

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
  @Field(() => String, { nullable: true })
  @ValidateIf((o) => o.before !== undefined)
  @Validate(CannotUseWithout, ['last'])
  @Validate(CannotUseWith, ['after', 'first'])
  before?: Relay.ConnectionCursor;

  @Field(() => String, { nullable: true })
  @ValidateIf((o) => o.after !== undefined)
  @Validate(CannotUseWithout, ['first'])
  @Validate(CannotUseWith, ['before', 'last'])
  after?: Relay.ConnectionCursor;

  @Field({ nullable: true })
  @ValidateIf((o) => o.first !== undefined)
  @Min(1)
  @Validate(CannotUseWith, ['before', 'last'])
  first?: number;

  @Field({ nullable: true })
  @ValidateIf((o) => o.last !== undefined)
  @Validate(CannotUseWithout, ['before'])
  @Validate(CannotUseWith, ['after', 'first'])
  @Min(1)
  last?: number;
}
