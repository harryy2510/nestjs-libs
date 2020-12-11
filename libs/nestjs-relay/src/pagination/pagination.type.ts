import * as Relay from 'graphql-relay';

export type Pagination<T> = Relay.Connection<T | undefined>;
