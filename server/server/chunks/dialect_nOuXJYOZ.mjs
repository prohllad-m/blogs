import { t as FailFastPostgresDialect } from "./pg-migration-lock_Cs4KC_oZ.mjs";
import { Pool } from "pg";
//#region node_modules/emdash/dist/db/postgres.mjs
/**
* Create a PostgreSQL dialect from config
*/
function createDialect$1(config) {
	return new FailFastPostgresDialect({ pool: new Pool({
		connectionString: config.connectionString,
		host: config.host,
		port: config.port,
		database: config.database,
		user: config.user,
		password: config.password,
		ssl: config.ssl,
		min: config.pool?.min ?? 0,
		max: config.pool?.max ?? 10
	}) });
}
//#endregion
//#region \0virtual:emdash/dialect
var createDialect = createDialect$1;
var createRequestScopedDb = (_opts) => null;
//#endregion
export { createRequestScopedDb as n, createDialect as t };
