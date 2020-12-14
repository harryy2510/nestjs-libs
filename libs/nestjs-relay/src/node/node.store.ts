declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      store: Map<string, string>;
    }
  }
}

if (!global.store) {
  global.store = new Map<string, string>();
}

function clear() {
  return global.store.clear();
}

function remove(key: string) {
  return global.store.delete(key);
}

function get(key: string) {
  return global.store.get(key);
}

function set(key: string, value: string) {
  return global.store.set(key, value);
}

const nodeStore = {
  get,
  set,
  remove,
  clear,
};

export default nodeStore;
