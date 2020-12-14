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

const nodeStore = global.store;

export default nodeStore;
