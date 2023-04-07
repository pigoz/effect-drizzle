# effect-sql

SQL Databases with Effect!

This project is a mashup of a few fantastic libraries to handle SQL databases
in TypeScript.

  - [Kysely](https://github.com/kysely-org/kysely) as a Query Builder
  - [Drizzle](https://github.com/drizzle-team/drizzle-orm) for TypeScript-first
    schema declaration (and migrations!)

  - Custom code to make the Effect experience as nice as possible:
    - Layer to manage the ConnectionPool
    - Layer to run migrations (of course this is opt-in)
    - Query operators with tagged errors in the failure channel
    - DSL for nested transactions (using savepoints!)

⚠️ Under development, working on PostgreSQL (and dogfooding) right now.
  Will add SQLite and MySQL when the PostgreSQL API is stable.

### Example

```typescript
// schema.ts
import { pgTable, serial, text } from "effect-sql/pg/schema"

const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  name: text("title").notNull(),
});


// dsl.ts
import { InferDatabase, createQueryDsl } from "effect-sql/pg/schema";
import * as schema from "./schema.ts";

interface Database extends InferDatabase<typeof schema> {}
export const db = createQueryDsl<Database>();


// app.ts
import {
  runQuery,
  runQueryOne,
  runQueryExactlyOne,
  transaction
} from "effect-sql/pg

import { db } from './dsl.ts';

const post1 = runQuery(db.selectFrom('posts'));
//    ^ Effect<PgConnection, PgError, Post>

const post2 = runQueryOne(db.selectFrom('posts'));
//    ^ Effect<PgConnection, PgError | NotFound, Post>

const post3 = runQueryExactlyOne(db.selectFrom('posts'));
//    ^ Effect<PgConnection, PgError | NotFound | TooMany, Post>

transaction(Effect.all(
  db.insertInto('posts').values({ title: 'Solvet saeclum' }),
  transaction(Effect.all(
    db.insertInto('posts').values({ title: 'in favilla' }),
    db.insertInto('posts').values({ title: 'Teste David cum Sibylla' }),
  )),
))
```

[Please check the tests for more complete examples!](https://github.com/pigoz/effect-sql/tree/main/test)
