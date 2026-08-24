import { PostgresAdapter, PostgresDialect, sql } from "kysely";
//#region node_modules/emdash/dist/database/pg-migration-lock.mjs
/**
* Sentinel message thrown when another migrator holds the advisory lock.
* `runMigrations` matches on it to route into the concurrent-migrator wait.
*/
var MIGRATION_LOCK_BUSY_MESSAGE = "EMDASH_MIGRATION_LOCK_BUSY";
/**
* Kysely's advisory lock id (LOCK_ID in kysely's postgres-adapter). Reused
* deliberately: during a rolling deploy, old isolates still run the stock
* blocking adapter, and using the same id keeps old and new builds mutually
* exclusive on the same lock.
*/
var KYSELY_PG_MIGRATION_LOCK_ID = BigInt("3853314791062309107");
/**
* Extends the stock adapter so every capability flag and `instanceof` check
* is inherited, and keeps the class NAME `PostgresAdapter` because
* `detectDialect()` (dialect-helpers.ts) identifies the dialect via
* `adapter.constructor.name` — a differently-named adapter would make every
* dialect helper fall back to SQLite SQL against a Postgres database.
*/
var PostgresAdapter$1 = class extends PostgresAdapter {
	async acquireMigrationLock(db, _opt) {
		if (!(await sql`
			select pg_try_advisory_xact_lock(${sql.lit(KYSELY_PG_MIGRATION_LOCK_ID)}) as acquired
		`.execute(db)).rows[0]?.acquired) throw new Error(MIGRATION_LOCK_BUSY_MESSAGE);
	}
};
/**
* Drop-in replacement for Kysely's `PostgresDialect` whose migration lock
* fails fast instead of blocking inside the database. Everything except
* `createAdapter` is inherited unchanged, and because it subclasses
* `PostgresDialect`, the public dialect type of `emdash/db/postgres` stays
* `PostgresDialect` and `instanceof` checks keep working.
*/
var FailFastPostgresDialect = class extends PostgresDialect {
	createAdapter() {
		return new PostgresAdapter$1();
	}
};
//#endregion
export { MIGRATION_LOCK_BUSY_MESSAGE as n, FailFastPostgresDialect as t };
