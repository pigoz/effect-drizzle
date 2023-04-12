import * as Data from "@effect/data/Data";

const PgErrorSymbolKey = "pigoz/effect-sql/PgError";
const PgErrorTypeId: unique symbol = Symbol.for(PgErrorSymbolKey);
type PgErrorTypeId = typeof PgErrorTypeId;

export class PgError extends Data.TaggedClass("PgError")<{
  readonly code: string;
  readonly message: string;
}> {
  readonly [PgErrorTypeId] = PgErrorTypeId;
}

const PoolErrorSymbolKey = "pigoz/effect-sql/PgError";
const PoolErrorTypeId: unique symbol = Symbol.for(PoolErrorSymbolKey);
type PoolErrorTypeId = typeof PoolErrorTypeId;

export class PoolError extends Data.TaggedClass("PoolError")<{
  readonly error: Error;
}> {
  readonly [PoolErrorTypeId] = PoolErrorTypeId;
}

const MigrationErrorTypeId: unique symbol = Symbol.for(
  "pigoz/effect-sql/MigrationError"
);

type MigrationErrorTypeId = typeof MigrationErrorTypeId;

export class MigrationError extends Data.TaggedClass("MigrationError")<{
  readonly error: unknown;
}> {
  readonly [MigrationErrorTypeId] = MigrationErrorTypeId;
}

export const isPgError = (u: unknown): u is PgError =>
  typeof u === "object" && u != null && PgErrorTypeId in u;

const NotFoundSymbolKey = "pigoz/effect-sql/NotFound";
const NotFoundTypeId: unique symbol = Symbol.for(NotFoundSymbolKey);
type NotFoundTypeId = typeof NotFoundTypeId;

export class NotFound extends Data.TaggedClass("NotFound")<{
  readonly sql: string;
  readonly parameters: readonly unknown[];
}> {
  readonly [NotFoundTypeId] = NotFoundTypeId;
}

export const isNotFound = (u: unknown): u is NotFound =>
  typeof u === "object" && u != null && NotFoundTypeId in u;

const TooManySymbolKey = "pigoz/effect-sql/TooMany";
const TooManyTypeId: unique symbol = Symbol.for(TooManySymbolKey);
type TooManyTypeId = typeof TooManyTypeId;

export class TooMany extends Data.TaggedClass("TooMany")<{
  readonly sql: string;
  readonly parameters: readonly unknown[];
}> {
  readonly [TooManyTypeId] = TooManyTypeId;
}

export const isTooMany = (u: unknown): u is TooMany =>
  typeof u === "object" && u != null && TooManyTypeId in u;
