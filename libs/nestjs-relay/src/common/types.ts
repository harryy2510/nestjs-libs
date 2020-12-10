import { ArgsOptions, ReturnTypeFunc } from '@nestjs/graphql';

export type AnyConstructor<T = Record<string, unknown>> = new (
  ...args: any[]
) => T;

export type AnyFunction<A = any> = (...input: any[]) => A;

export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;

export type ParameterMetadata = Omit<ArgsOptions, 'type'> & {
  typeFunc: ReturnTypeFunc;
  paramIndex: number;
};
