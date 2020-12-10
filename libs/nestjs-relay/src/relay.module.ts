import { Module } from '@nestjs/common';
import { GlobalIdScalar } from './global-id';

@Module({ providers: [GlobalIdScalar] })
export class RelayModule {}
