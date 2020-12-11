import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationArgs } from './pagination-args.type';
import * as Relay from 'graphql-relay';

type PagingMeta =
  | { pagingType: 'forward'; after?: string; first: number }
  | { pagingType: 'backward'; before?: string; last: number }
  | { pagingType: 'none' };

function getMeta(args: PaginationArgs): PagingMeta {
  const { first = 0, last = 0, after, before } = args;
  const isForwardPaging = !!first || !!after;
  const isBackwardPaging = !!last || !!before;

  return isForwardPaging
    ? { pagingType: 'forward', after, first }
    : isBackwardPaging
    ? { pagingType: 'backward', before, last }
    : { pagingType: 'none' };
}

export function getPagingParameters(args: PaginationArgs) {
  const meta = getMeta(args);

  switch (meta.pagingType) {
    case 'forward': {
      return {
        limit: meta.first,
        offset: meta.after ? Relay.cursorToOffset(meta.after) + 1 : 0,
      };
    }
    case 'backward': {
      const { last, before } = meta;
      let limit = last;
      let offset = Relay.cursorToOffset(before!) - last;

      // Check to see if our before-page is underflowing past the 0th item
      if (offset < 0) {
        // Adjust the limit with the underflow value
        limit = Math.max(last + offset, 0);
        offset = 0;
      }

      return { offset, limit };
    }
    default:
      return {};
  }
}

export async function findAndPaginate<T>(
  condition: FindManyOptions<T>,
  connArgs: PaginationArgs,
  repository: Repository<T>,
) {
  const { limit, offset } = getPagingParameters(connArgs);
  const [entities, count] = await repository.findAndCount({
    ...condition,
    skip: offset,
    take: limit,
  });
  return Relay.connectionFromArraySlice(entities, connArgs, {
    arrayLength: count,
    sliceStart: offset || 0,
  });
}

export async function getManyAndPaginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  connArgs: PaginationArgs,
) {
  const { limit, offset } = getPagingParameters(connArgs);
  const [entities, count] = await queryBuilder
    .offset(offset)
    .limit(limit)
    .getManyAndCount();

  return Relay.connectionFromArraySlice(entities, connArgs, {
    arrayLength: count,
    sliceStart: offset || 0,
  });
}
