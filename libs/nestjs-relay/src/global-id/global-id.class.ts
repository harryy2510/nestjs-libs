import { ResolvedGlobalId } from 'graphql-relay';

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
