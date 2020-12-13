import {
  AnyEntity,
  PrimaryKey,
  PrimaryKeyOptions,
  Type,
  ValidationError,
} from '@mikro-orm/core';
import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { isUUID } from '@nestjs/common/utils/is-uuid';

export function NodeKey<T>(type: string, options: PrimaryKeyOptions<T> = {}) {
  return function (target: AnyEntity, propertyName: string) {
    class NodeIdType extends Type<string, string> {
      convertToDatabaseValue(value: string): string {
        const globalId = fromGlobalId(value);
        if (globalId.type && isUUID(globalId.id, '4')) {
          value = globalId.id;
        }
        if (isUUID(value, '4')) {
          return value;
        }
        throw ValidationError.invalidType(NodeIdType, value, 'JS');
      }

      convertToJSValue(value: string): string {
        return toGlobalId(type, value);
      }

      getColumnType() {
        return 'varchar(36)';
      }
    }

    options.type = NodeIdType;
    return PrimaryKey(options)(target, propertyName);
  };
}
