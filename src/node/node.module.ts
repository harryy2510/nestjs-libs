import { Module } from '@nestjs/common';
import { NodeResolver } from './node.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [NodeResolver],
})
export class NodeModule {}
