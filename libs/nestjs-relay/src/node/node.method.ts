import { nanoid } from 'nanoid';
import nodeStore from './node.store';

export function createNodeId(type: string) {
  const prefix = nodeStore.get(type);
  if (!prefix) {
    throw new Error(`Prefix note registered for type - ${type}`);
  }
  return `${prefix}_${nanoid()}`;
}

export function parseId(id: string) {
  const prefix = id.slice(0, 3);
  const entityId = id.slice(4);
  let type = '';
  nodeStore.forEach((value, key) => {
    if (value === prefix) {
      type = key;
    }
  });
  return {
    id,
    entityId,
    type,
    prefix,
  };
}

export function registerNodePrefix(type: string, prefix: string) {
  if (prefix.length !== 3) {
    throw new Error(`Prefix - ${prefix} is not of length 3`);
  }
  if (nodeStore.get(type)) {
    throw new Error(`Prefix for type - ${type} already exists`);
  }
  nodeStore.set(type, prefix);
}
