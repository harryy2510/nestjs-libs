import { nanoid } from 'nanoid';
import nodeStore from './node.store';

export function createNodeId(type: string) {
  const prefix = nodeStore.get(type);
  if (!prefix) {
    throw new Error(`Prefix note registered for type - ${type}`);
  }
  return `${prefix}_${nanoid()}`;
}

export function registerNodePrefix(type: string, prefix: string) {
  if (nodeStore.get(type)) {
    throw new Error(`Prefix for type - ${type} already exists`);
  }
  nodeStore.set(type, prefix);
}
