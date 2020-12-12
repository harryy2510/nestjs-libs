import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { NodeColumn } from './node-column.decorator';
import { fromGlobalId, toGlobalId } from 'graphql-relay';

@InterfaceType('Node')
export class Node extends CreateNode('Node') {}

export function CreateNode(type: string): any {
  const transformer = {
    from: (dbValue) => toGlobalId(type, dbValue),
    to: (entityValue) => entityValue && fromGlobalId(entityValue).id,
  };

  @InterfaceType({ isAbstract: true })
  abstract class Node {
    @Field(() => ID)
    @NodeColumn({ transformer })
    id: string;
  }

  return Node;
}
