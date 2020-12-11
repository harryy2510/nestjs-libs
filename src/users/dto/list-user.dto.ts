import { ArgsType, ObjectType } from '@nestjs/graphql';
import { Paginated, PaginationArgs } from '@harryy/nestjs-relay';
import { User } from '../entities/user.entity';

@ArgsType()
export class ListUserArgs extends PaginationArgs {}

@ObjectType()
export class ListUserResponse extends Paginated(User) {}
