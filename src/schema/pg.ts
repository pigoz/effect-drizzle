import { pipe } from "@effect/data/Function";
import * as Layer from "@effect/io/Layer";
import * as Effect from "@effect/io/Effect";

import { ConnectionScope, connect } from "effect-sql/query";
import * as TaggedScope from "effect-sql/TaggedScope";
import { MigrationError } from "effect-sql/errors";

import { drizzle } from "drizzle-orm/node-postgres/driver.js";
import { migrate as dmigrate } from "drizzle-orm/node-postgres/migrator.js";

export * from "drizzle-orm/pg-core/index.js";

export { InferModel } from "drizzle-orm";

export function MigrationLayer(path: string) {
  return Layer.effectDiscard(migrate(path));
}

export function migrate(migrationsFolder: string) {
  return pipe(
    connect(),
    Effect.flatMap((client) =>
      Effect.tryCatchPromise(
        () => {
          const d = drizzle(client.native);
          return dmigrate(d, { migrationsFolder });
        },
        (error) => new MigrationError({ error })
      )
    ),
    TaggedScope.scoped(ConnectionScope)
  );
}
