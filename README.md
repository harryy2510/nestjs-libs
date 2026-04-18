<p align="center">
  <h1 align="center">NestJS Libs</h1>
  <p align="center">
    <strong>Relay-compliant GraphQL primitives for NestJS.</strong>
  </p>
  <p align="center">
    <code>cursor pagination</code> · <code>global node IDs</code> · <code>mutation responses</code> · <code>TypeORM</code>
  </p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@harryy/nestjs-relay"><img src="https://img.shields.io/npm/v/@harryy/nestjs-relay.svg?style=flat-square" alt="npm"></a>
  <a href="https://nestjs.com"><img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://graphql.org"><img src="https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white" alt="GraphQL"></a>
</p>

---

> **Note:** This project is archived and no longer actively maintained.

---

## Install

```bash
npm install @harryy/nestjs-relay
```

---

## Node IDs

Globally unique, type-prefixed IDs following the Relay Node specification.

```typescript
import { Node, createNodeId, parseId, NodeIdColumn } from '@harryy/nestjs-relay'

@ObjectType({ implements: [Node] })
class User {
  @NodeIdColumn()
  id: string
}

const id = createNodeId('User')    // "usr_V1StGXR8_Z5jdHi6B-myT"
const parsed = parseId(id)          // { id, type: 'User', prefix: 'usr' }
```

```
  createNodeId('User')
       |
       v
  3-char prefix + nanoid
       |
       v
  "usr_V1StGXR8_Z5jdHi6B-myT"    globally unique, type-decodable
```

---

## Pagination

Cursor-based pagination with TypeORM integration.

```typescript
import { PaginationArgs, findAndPaginate, PaginatedDto } from '@harryy/nestjs-relay'

@Resolver(() => User)
class UserResolver {
  @Query(() => PaginatedDto(User))
  async users(@Args() args: PaginationArgs) {
    return findAndPaginate({}, args, this.userRepo)
  }
}
```

Supports forward (`first`/`after`) and backward (`last`/`before`) pagination. Returns:

```
  {
    edges: [{ node, cursor }]
    pageInfo: {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
```

---

## Mutations

Relay-compliant mutation responses with client mutation tracking.

```typescript
import { MutationInput, MutationResponse, createMutationResponse } from '@harryy/nestjs-relay'

@InputType()
class CreateUserInput extends MutationInput {
  @Field()
  name: string
}

@ObjectType()
class CreateUserPayload extends MutationResponse(User) {}

@Mutation(() => CreateUserPayload)
async createUser(@Args('input') input: CreateUserInput) {
  const user = await this.userService.create(input)
  return createMutationResponse(input, user)
}
```

---

## Dependencies

graphql, graphql-relay, @nestjs/common, @nestjs/typeorm, class-validator, nanoid

---

## License

MIT
