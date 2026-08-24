import { i as setRequestCacheEntry, n as peekRequestCache, r as requestCached } from "./request-cache_CwLBsNi5.mjs";
import { i as getDb } from "./loader_H3QLxJZA.mjs";
import { t as validateIdentifier } from "./validate_DjLzGa7z.mjs";
import { a as chunks, i as resolveLocaleChain, o as buildStatusCondition, r as resolveLocale } from "./resolve_tHc8MOuV.mjs";
import { t as getRequestContext } from "./request-context_B6_F_lNS.mjs";
import { i as isMissingTableError } from "./config_xGs4R7N0.mjs";
import { c as isObjectCacheActive, n as cachedQuery, r as contentNamespace, t as CacheNamespace } from "./object-cache_BOlPl5ud.mjs";
import { sql } from "kysely";
//#region node_modules/emdash/src/taxonomies/term-counts.ts
/**
* Per-collection count branch. `taxonomy_id` stores the term's
* translation_group, so results are keyed by group (locale-independent) and
* each assignment is counted once no matter how many locales the term has.
*
* Scoping to the taxonomy uses `translation_group IN (...)` rather than a
* join on `taxonomies.id` — the anchor row (id == group) can be deleted while
* sibling translations survive, and a plain join on `translation_group` would
* multiply counts by the number of locales.
*/
function collectionBranch(db, taxonomyName, collection) {
	return sql`
		SELECT ct.taxonomy_id AS taxonomy_id, COUNT(*) AS count
		FROM content_taxonomies AS ct
		INNER JOIN ${sql.ref(`ec_${collection}`)} AS e ON e.id = ct.entry_id
		WHERE ct.collection = ${collection}
			AND ct.taxonomy_id IN (SELECT translation_group FROM taxonomies WHERE name = ${taxonomyName})
			AND ${buildStatusCondition(db, "published", "e")}
			AND e.deleted_at IS NULL
		GROUP BY ct.taxonomy_id`;
}
async function runCounts(db, taxonomyName, collections) {
	const branches = collections.map((collection) => collectionBranch(db, taxonomyName, collection));
	const union = sql.join(branches, sql` UNION ALL `);
	const result = await sql`
		SELECT taxonomy_id, SUM(count) AS count
		FROM (${union}) AS per_collection
		GROUP BY taxonomy_id`.execute(db);
	const counts = /* @__PURE__ */ new Map();
	for (const row of result.rows) counts.set(row.taxonomy_id, Number(row.count));
	return counts;
}
/**
* Count publicly-visible term assignments for one taxonomy, keyed by the
* term's translation_group (what `content_taxonomies.taxonomy_id` stores).
*
* Counts are scoped to the taxonomy's declared collections — pass
* `TaxonomyDef.collections` (`_emdash_taxonomy_defs.collections`). Collections
* whose `ec_*` table doesn't exist (pre-migration drift, a declared collection
* that was never created) are skipped, yielding a partial-but-correct count
* rather than a throw.
*
* One database round-trip for the whole taxonomy (UNION ALL across
* collections). Callers on the public render path should go through the
* request-cached wrapper in `taxonomies/index.ts` so a page rendering both the
* widget and a term detail shares one computation.
*/
async function fetchVisibleTermCounts(db, taxonomyName, collections) {
	const unique = [...new Set(collections)];
	for (const collection of unique) validateIdentifier(collection, "collection slug");
	if (unique.length === 0) return /* @__PURE__ */ new Map();
	try {
		return await runCounts(db, taxonomyName, unique);
	} catch (error) {
		if (!isMissingTableError(error)) throw error;
	}
	const counts = /* @__PURE__ */ new Map();
	for (const collection of unique) try {
		for (const [group, count] of await runCounts(db, taxonomyName, [collection])) counts.set(group, (counts.get(group) ?? 0) + count);
	} catch (error) {
		if (!isMissingTableError(error)) throw error;
	}
	return counts;
}
//#endregion
//#region node_modules/emdash/src/taxonomies/index.ts
/**
* Runtime API for taxonomies.
*
* All helpers are locale-aware. When a locale is not passed explicitly we fall
* back to the request context or the configured `defaultLocale` (see
* `i18n/resolve.ts`).
*
* Because `content_taxonomies.taxonomy_id` stores the translation_group (not a
* specific term id), the joins here are `taxonomies.translation_group =
* content_taxonomies.taxonomy_id` + filter by `taxonomies.locale`, which picks
* the right per-locale term.
*/
var TAXONOMY_DEFS_CACHE_KEY = Symbol.for("emdash:taxonomy-defs");
var taxonomyDefsStore = globalThis;
var defsHolder = taxonomyDefsStore[TAXONOMY_DEFS_CACHE_KEY] ?? (() => {
	const h = {
		version: 0,
		cache: /* @__PURE__ */ new Map()
	};
	taxonomyDefsStore[TAXONOMY_DEFS_CACHE_KEY] = h;
	return h;
})();
/**
* Fetch taxonomy definitions straight from the database (no caching).
*/
async function fetchTaxonomyDefs(locale) {
	let query = (await getDb()).selectFrom("_emdash_taxonomy_defs").selectAll();
	if (locale !== void 0) query = query.where("locale", "=", locale);
	return (await query.execute()).map(rowToTaxonomyDef);
}
/**
* Resolve taxonomy defs through the isolate fallback cache, bypassing it for
* isolated databases. The returned promise is cached (not the resolved value)
* so concurrent cold-isolate readers share one in-flight query; a rejection
* evicts the entry so the next caller retries.
*/
function loadTaxonomyDefs(localeKey, locale) {
	if (getRequestContext()?.dbIsIsolated === true) return fetchTaxonomyDefs(locale);
	const existing = defsHolder.cache.get(localeKey);
	if (existing && existing.version === defsHolder.version) return existing.promise;
	const version = defsHolder.version;
	const promise = fetchTaxonomyDefs(locale).catch((error) => {
		const current = defsHolder.cache.get(localeKey);
		if (current && current.promise === promise) defsHolder.cache.delete(localeKey);
		throw error;
	});
	defsHolder.cache.set(localeKey, {
		version,
		promise
	});
	return promise;
}
/**
* Get every taxonomy definition. Definitions are per-locale (one row per
* locale inside the same translation_group) — by default we resolve to the
* active locale.
*
* Two-tier cache: per-request via `requestCached` (so a single render that
* hydrates terms for several collections pays at most one call), then
* per-isolate via the global holder (so warm renders issue zero queries).
* The `requestCached` key is unchanged so `getTaxonomyDef`'s peek still hits.
*/
async function getTaxonomyDefs(options = {}) {
	const locale = resolveLocale(options.locale);
	const localeKey = locale ?? "*";
	return requestCached(`taxonomy-defs:${localeKey}`, async () => {
		if (await isObjectCacheActive()) return cachedQuery({
			namespace: CacheNamespace.TAXONOMIES,
			key: `defs:${localeKey}`,
			load: () => fetchTaxonomyDefs(locale)
		});
		return loadTaxonomyDefs(localeKey, locale);
	});
}
/**
* Get a single taxonomy definition by name. Uses the fallback chain so even
* if there is no translation for the active locale we still return something.
*
* If `getTaxonomyDefs()` has already loaded the full list in this request
* (which happens during entry-term hydration on every page that renders a
* collection), search the matching def in memory rather than running a
* second query against `_emdash_taxonomy_defs`.
*/
async function getTaxonomyDef(name, options = {}) {
	const chain = resolveLocaleChain(options.locale);
	const peekKey = `taxonomy-defs:${resolveLocale(options.locale) ?? "*"}`;
	const allDefs = peekRequestCache(peekKey);
	if (allDefs) {
		const defs = await allDefs;
		if (chain.length === 0) return defs.find((d) => d.name === name) ?? null;
		for (const locale of chain) {
			const found = defs.find((d) => d.name === name && d.locale === locale);
			if (found) return found;
		}
		return null;
	}
	return requestCached(`taxonomy-def:${name}:${chain.join(",")}`, async () => {
		const db = await getDb();
		if (chain.length === 0) {
			const row = await db.selectFrom("_emdash_taxonomy_defs").selectAll().where("name", "=", name).orderBy("locale", "asc").executeTakeFirst();
			return row ? rowToTaxonomyDef(row) : null;
		}
		for (const locale of chain) {
			const row = await db.selectFrom("_emdash_taxonomy_defs").selectAll().where("name", "=", name).where("locale", "=", locale).executeTakeFirst();
			if (row) return rowToTaxonomyDef(row);
		}
		return null;
	});
}
/**
* Object-cache namespaces for values that embed visible term counts: the
* taxonomy epoch (term/assignment writes) plus each counted collection's
* content epoch, so publishing, unpublishing, or trashing an entry
* invalidates the cached count promptly. A scheduled entry becoming due
* flips visibility without a write, so that staleness stays bounded by the
* cache entry's TTL.
*/
function termCountNamespaces(collections) {
	return [...Array.from(new Set(collections), contentNamespace), CacheNamespace.TAXONOMIES];
}
/**
* All terms of a taxonomy in a specific locale (flat for non-hierarchical,
* tree for hierarchical).
*/
async function getTaxonomyTerms(taxonomyName, options = {}) {
	const locale = resolveLocale(options.locale);
	return requestCached(`taxonomy-terms:${taxonomyName}:${locale ?? "*"}`, async () => {
		const def = await getTaxonomyDef(taxonomyName, options);
		if (!def) return [];
		return cachedQuery({
			namespace: termCountNamespaces(def.collections),
			key: `terms:${taxonomyName}:${locale ?? "*"}`,
			load: () => loadTaxonomyTerms(def, locale)
		});
	});
}
async function loadTaxonomyTerms(def, locale) {
	let termsQuery = (await getDb()).selectFrom("taxonomies").selectAll().where("name", "=", def.name).orderBy("label", "asc");
	if (locale !== void 0) termsQuery = termsQuery.where("locale", "=", locale);
	const [rows, counts] = await Promise.all([termsQuery.execute(), getVisibleTermCounts(def.name, def.collections)]);
	const flatTerms = rows.map((row) => ({
		id: row.id,
		name: row.name,
		slug: row.slug,
		label: row.label,
		parent_id: row.parent_id,
		data: row.data,
		locale: row.locale,
		translation_group: row.translation_group
	}));
	if (def.hierarchical) return buildTree(flatTerms, counts);
	return flatTerms.map((term) => ({
		id: term.id,
		name: term.name,
		slug: term.slug,
		label: term.label,
		description: term.data ? JSON.parse(term.data).description : void 0,
		children: [],
		count: counts.get(term.translation_group ?? term.id) ?? 0,
		locale: term.locale,
		translationGroup: term.translation_group
	}));
}
/**
* Per-translation-group visible-usage counts for one taxonomy, in a single
* round-trip (see `fetchVisibleTermCounts`). Counts are locale-independent
* (the pivot stores translation_group), and the request-cached map is shared
* by every consumer in the render — the widget (`getTaxonomyTerms`) and the
* single-term page (`getTerm`) never issue separate count queries.
*/
function getVisibleTermCounts(taxonomyName, collections) {
	const scope = [...new Set(collections)].toSorted().join(",");
	return requestCached(`taxonomy-term-counts:${taxonomyName}:${scope}`, async () => {
		return fetchVisibleTermCounts(await getDb(), taxonomyName, collections);
	});
}
/**
* Batch-fetch terms for multiple entries across ALL taxonomies in one query.
* Primes the request-cache for subsequent per-entry calls to `getEntryTerms`.
*/
async function getAllTermsForEntries(collection, entryIds, options = {}) {
	const result = /* @__PURE__ */ new Map();
	const uniqueIds = [...new Set(entryIds)];
	for (const id of uniqueIds) result.set(id, {});
	if (uniqueIds.length === 0) return result;
	const db = await getDb();
	const locale = resolveLocale(options.locale);
	const applicableTaxonomyNames = await getCollectionTaxonomyNames(collection, { locale });
	for (const chunk of chunks(uniqueIds, 50)) {
		let rows;
		try {
			let query = db.selectFrom("content_taxonomies").innerJoin("taxonomies", "taxonomies.translation_group", "content_taxonomies.taxonomy_id").select([
				"content_taxonomies.entry_id",
				"taxonomies.id",
				"taxonomies.name",
				"taxonomies.slug",
				"taxonomies.label",
				"taxonomies.parent_id",
				"taxonomies.locale",
				"taxonomies.translation_group"
			]).where("content_taxonomies.collection", "=", collection).where("content_taxonomies.entry_id", "in", chunk).orderBy("taxonomies.label", "asc");
			if (locale !== void 0) query = query.where("taxonomies.locale", "=", locale);
			rows = await query.execute();
		} catch (error) {
			if (isMissingTableError(error)) {
				for (const id of uniqueIds) primeEntryTermsCache(collection, id, {}, applicableTaxonomyNames, locale);
				return result;
			}
			throw error;
		}
		for (const row of rows) {
			const term = {
				id: row.id,
				name: row.name,
				slug: row.slug,
				label: row.label,
				parentId: row.parent_id ?? void 0,
				children: [],
				locale: row.locale,
				translationGroup: row.translation_group
			};
			const byTaxonomy = result.get(row.entry_id);
			if (!byTaxonomy) continue;
			const existing = byTaxonomy[row.name];
			if (existing) existing.push(term);
			else byTaxonomy[row.name] = [term];
		}
	}
	for (const [entryId, byTaxonomy] of result) primeEntryTermsCache(collection, entryId, byTaxonomy, applicableTaxonomyNames, locale);
	return result;
}
/**
* Return the list of taxonomy names applicable to a collection, request-
* cached so a page render only pays for it once.
*
* Returns an empty list when taxonomies haven't been defined yet.
*/
async function getCollectionTaxonomyNames(collection, options) {
	try {
		return (await getTaxonomyDefs(options)).filter((d) => d.collections.includes(collection)).map((d) => d.name);
	} catch (error) {
		if (isMissingTableError(error)) return [];
		throw error;
	}
}
/**
* Pre-populate the request-cache for every getEntryTerms call-shape that
* could hit this entry:
*
*   getEntryTerms(collection, entryId)                 -> key `terms:C:E:*`
*   getEntryTerms(collection, entryId, "tag")          -> key `terms:C:E:tag`
*   getEntryTerms(collection, entryId, "category")     -> key `terms:C:E:category`
*   ...one per taxonomy that applies to this collection
*
* Taxonomies with no rows on this entry are seeded with `[]` so legacy
* callers short-circuit to the cached empty array instead of re-querying.
*/
function primeEntryTermsCache(collection, entryId, byTaxonomy, applicableTaxonomyNames, locale) {
	const localeKey = locale ?? "*";
	for (const name of applicableTaxonomyNames) setRequestCacheEntry(`terms:${collection}:${entryId}:${name}:${localeKey}`, byTaxonomy[name] ?? []);
	for (const [name, terms] of Object.entries(byTaxonomy)) setRequestCacheEntry(`terms:${collection}:${entryId}:${name}:${localeKey}`, terms);
	const allTerms = Object.values(byTaxonomy).flat();
	setRequestCacheEntry(`terms:${collection}:${entryId}:*:${localeKey}`, allTerms);
}
/**
* Prime the per-entry request cache from terms that were folded into the
* content query (query.ts `hydrateEntryTerms` fast path), so subsequent
* `getEntryTerms` calls in the same render hit the cache instead of issuing an
* N+1 query. Seeds the wildcard key and one key per taxonomy present on the
* entry — purely from the folded data, with no DB lookup.
*
* Unlike `getAllTermsForEntries`, this deliberately does NOT seed `[]` for
* taxonomies that apply to the collection but have no rows on the entry: doing
* so would require a `getTaxonomyDefs` query, adding a round trip to every fold
* render to serve the rarer `getEntryTerms(id, absentTaxonomy)` case from cache.
* That call simply falls through to its own cached query. Keeping the key shape
* here (rather than in query.ts) prevents the two from drifting.
*/
function primeFoldedEntryTerms(collection, perEntry, options = {}) {
	if (perEntry.length === 0) return;
	const locale = resolveLocale(options.locale);
	for (const { entryId, byTaxonomy } of perEntry) primeEntryTermsCache(collection, entryId, byTaxonomy, [], locale);
}
function rowToTaxonomyDef(row) {
	return {
		id: row.id,
		name: row.name,
		label: row.label,
		labelSingular: row.label_singular ?? void 0,
		hierarchical: row.hierarchical === 1,
		collections: row.collections ? JSON.parse(row.collections) : [],
		locale: row.locale,
		translationGroup: row.translation_group
	};
}
/**
* Build tree structure from flat terms
*/
function buildTree(flatTerms, counts) {
	const byLocaleGroup = /* @__PURE__ */ new Map();
	const nodes = [];
	const roots = [];
	for (const term of flatTerms) {
		const node = {
			id: term.id,
			name: term.name,
			slug: term.slug,
			label: term.label,
			parentId: term.parent_id ?? void 0,
			description: term.data ? JSON.parse(term.data).description : void 0,
			children: [],
			count: counts.get(term.translation_group ?? term.id) ?? 0,
			locale: term.locale,
			translationGroup: term.translation_group
		};
		byLocaleGroup.set(`${term.locale}::${term.translation_group ?? term.id}`, node);
		nodes.push(node);
	}
	for (const node of nodes) {
		const parent = node.parentId ? byLocaleGroup.get(`${node.locale}::${node.parentId}`) : void 0;
		if (parent) parent.children.push(node);
		else roots.push(node);
	}
	return roots;
}
//#endregion
export { primeFoldedEntryTerms as a, getTaxonomyTerms as i, getTaxonomyDef as n, getTaxonomyDefs as r, getAllTermsForEntries as t };
