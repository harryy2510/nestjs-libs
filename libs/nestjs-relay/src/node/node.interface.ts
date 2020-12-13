import {
  Entity,
  EntityProperty,
  Platform,
  PrimaryKey,
  Type,
  ValidationError,
} from '@mikro-orm/core';
import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { v4 } from 'uuid';
import { isUUID } from '@nestjs/common/utils/is-uuid';

@Entity()
@InterfaceType('Node')
export class Node extends CreateNode('Node') {}

export function CreateNode(entityType: string) {
  class NodeIdType extends Type<string, string> {
    convertToDatabaseValue(value: string): string {
      const globalId = fromGlobalId(value);
      if (globalId.type === entityType && isUUID(globalId.id, '4')) {
        value = globalId.id;
      }
      if (isUUID(value, '4')) {
        return value;
      }
      throw ValidationError.invalidType(NodeIdType, value, 'JS');
    }

    convertToJSValue(value: string): string {
      return toGlobalId(entityType, value);
    }

    getColumnType(prop: EntityProperty, platform: Platform) {
      return 'varchar(36)';
    }
  }

  @Entity({ abstract: true })
  @InterfaceType({ isAbstract: true })
  abstract class Node {
    @Field(() => ID)
    @PrimaryKey({
      type: NodeIdType,
    })
    id: string = toGlobalId(entityType, v4());
  }

  return Node as any;
}
