export type AnyConstructor<A = any> = new (...args: any[]) => A;
export type AnyFunction<A = any> = () => AnyConstructor<A>;
