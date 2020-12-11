import { fromGlobalId, ResolvedGlobalId, toGlobalId } from 'graphql-relay';
import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLError, Kind, ValueNode } from 'graphql';

export class GlobalId implements ResolvedGlobalId {
  type: string;
  id: string;

  constructor(args: ResolvedGlobalId) {
    this.type = args.type;
    this.id = args.id;
  }

  toString() {
    return this.id;
  }
}

export type GlobalIdType = GlobalId;

@Scalar('ID', () => GlobalId)
export class GlobalIdScalar implements CustomScalar<string, GlobalId> {
  parseValue(value: string): GlobalId {
    const { id, type } = fromGlobalId(value);
    if (!id || !type) {
      throw new GraphQLError(`Invalid ID: ${value}`);
    }
    return new GlobalId({ type, id });
  }

  serialize(value: GlobalId): string {
    return toGlobalId(value.type, value.id);
  }

  parseLiteral(ast: ValueNode): GlobalId {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Invalid ID type: ${ast.kind}`);
    }
    const { id, type } = fromGlobalId(ast.value);
    if (!id || !type) {
      throw new GraphQLError(`Invalid ID: ${ast.value}`);
    }
    return new GlobalId({ type, id });
  }
}
